import 'es6-promise/auto';
import * as io from 'socket.io-client';
import * as Phaser from 'phaser-ce';
import * as fetch from 'isomorphic-fetch';
import { Doggo } from '../sprites/doggo';
import { setResponsiveWidth } from '../util/transform';

export class GameState extends Phaser.State {
  public music: Phaser.Sound;
  private lighthouse: Phaser.Button;

  private banner: Phaser.Text;
  private comment: Phaser.Text;
  private shadowTexture: Phaser.BitmapData;
  private lightSprite: Phaser.Image;

  private socket;

  private gameState;
  private previousTickMs;
  private previousTickServerTime;

  private players;

  private doggies: object = {};

  // init () {}

  public async preload() {
    // get initial gamestate
    const initialState = await fetch('/api/getState')
      .then((res) => res.json())
      .then((state) => {
        console.log('Initial state', state);
        return state;
      });
    this.handleGameEvent.bind(this)(initialState);
  }

  public create() {
    this.socket = io({transports: ['websocket']});
    this.socket.on('game event', (e) => {
      const event = JSON.parse(e);
      this.handleGameEvent.bind(this)(event);
    });

    this.music = this.game.add.audio('yar', 1, true);
    this.music.play();

    this.lighthouse = this.game.add.button(0, this.game.height, 'lighthouse', this.click.bind(this));
    this.lighthouse.anchor.setTo(0, 1);
    this.lighthouse.z = 50;

    this.game.input.onDown.add(this.click, this);

    setResponsiveWidth(this.lighthouse, 35, this.game.world);

    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
    this.lightSprite.z = 100;

    this.banner = this.add.text(this.game.world.centerX, 0, `Dead puppies so far: 0`, {});
    this.banner.font = 'Indie Flower';
    this.banner.fontSize = 35;
    this.banner.fill = '#fff';
    this.banner.anchor.setTo(0.5, 0);
    this.banner.z = 200;

    this.comment = this.add.text(this.game.world.centerX, this.game.height, 'Keep the lighthouse alive!', {});
    this.comment.font = 'Indie Flower';
    this.comment.fontSize = 24;
    this.comment.fill = '#fff';
    this.comment.anchor.setTo(0.5, 1);
    this.comment.z = 200;

    this.gameState = this.getInitialState();
  }

  public getInitialState() {
    return {
      lightHouseFuel: 20,
      players: 0,
      doggies: {},
    };
  }

  public render() {
    this.updateShadowTexture.bind(this)();
    this.banner.text = `Dead puppies so far: ${ this.gameState.deadPuppies }`;
    if (this.gameState.lightHouseFuel > 15) {
      this.comment.text = `There are currently ${ this.gameState.players } lighthouse keepers.`;
    }
  }

  private handleGameEvent(event) {
    const newState = this.gameState || {};
    if (event.state) {
      console.log('Game event', event.state);
      const { lightHouseFuel, puppies, serverTime, players } = event.state;
      const { sailingPuppies, deadPuppies, savedPuppies } = puppies;
      newState.lightHouseFuel = Number(lightHouseFuel);
      newState.deadPuppies = Number(deadPuppies);
      newState.savedPuppies = Number(savedPuppies);
      newState.players = players;

      this.previousTickServerTime = serverTime;
      this.previousTickMs = this.game.time.now;

      sailingPuppies.forEach((puppy) => {
        const { id, variant, spawned: serverSpawned } = puppy;
        const spawned = this.game.time.now - (serverTime - serverSpawned);
        if (!this.doggies[id]) {
          const doggo = new Doggo({
            game: this.game,
            asset: 'doggo',
            variant,
            spawned,
            targetX: this.lighthouse.centerX,
            targetY: this.lighthouse.centerY,
          });
          this.game.add.existing(doggo);
          this.game.world.bringToTop(this.lighthouse);
          this.game.world.bringToTop(this.lightSprite);
          this.game.world.bringToTop(this.banner);
          this.game.world.bringToTop(this.comment);
          this.doggies[id] = doggo;
          console.log('NEW DOG', doggo.spawned);
        }
      });

      console.log('Doggies', this.doggies);
    }
    this.gameState = newState;
  }

  private updateShadowTexture() {
    // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    const radiusBase = this.game.height > this.game.width ? this.game.height : this.game.width;
    const radius = radiusBase * 1.1 + Math.random() * 100;
    const intensity = (this.gameState.lightHouseFuel + 2 ) / 20;
    const easedIntensity = Math.pow(intensity, 2);
    const radius = (2 * radiusBase + Math.random() * 100) * easedIntensity;

    const lightX = this.lighthouse.centerX;
    const lightY = this.lighthouse.top;

    // Draw circle of light with a soft edge
    const gradient = this.shadowTexture.context
      .createRadialGradient(
        lightX,
        lightY,
        .2 * radius,
        lightX,
        lightY,
        radius,
      );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(lightX, lightY, radius, 0, Math.PI * 2, false);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
  }

  private click() {
    let { lightHouseFuel } = this.gameState;
    this.socket.emit('charge');
    lightHouseFuel += 5;
    if (lightHouseFuel > 20) {
      lightHouseFuel = 20;
    }
    this.gameState.lightHouseFuel = lightHouseFuel;
  }
}
