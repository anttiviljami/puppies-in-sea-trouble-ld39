import * as Phaser from 'phaser-ce';
import { Doggo } from '../sprites/doggo';
import { setResponsiveWidth } from '../utils';

export class GameState extends Phaser.State {
  public music: Phaser.Sound;

  private doggo: Doggo;
  private lighthouse: Phaser.Sprite;

  private shadowTexture;
  private lightSprite;

  // init () {}

  // public preload() {}

  public create() {
    this.music = this.game.add.audio('yar', 1, true);
    this.music.play();

    this.doggo = new Doggo({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'doggo',
      variant: Math.floor(Math.random() * 3),
    });

    this.lighthouse = this.game.add.sprite(0, this.game.height, 'lighthouse');
    this.lighthouse.anchor.setTo(0, 1);

    setResponsiveWidth(this.lighthouse, 35, this.game.world);
    this.game.add.existing(this.doggo);

    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
    this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;

    const banner = this.add.text(this.game.world.centerX, 0, 'Puppies in Sea Trouble', {});
    banner.font = 'Indie Flower';
    banner.fontSize = 35;
    banner.fill = '#fff';
    banner.anchor.setTo(0.5, 0);
  }

  public render() {
    this.updateShadowTexture();
    if (window['__DEV__']) {
      this.game.debug.spriteInfo(this.doggo, 32, 32);
    }
  }

  private updateShadowTexture() {
    // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    const radiusBase = this.game.height > this.game.width ? this.game.height : this.game.width;
    const radius = radiusBase * .75 + Math.random() * 100;
    const lightX = this.lighthouse.centerX;
    const lightY = this.lighthouse.top;

    // Draw circle of light with a soft edge
    const gradient = this.shadowTexture.context
      .createRadialGradient(
        lightX,
        lightY,
        .25 * radius,
        lightX,
        lightY,
        radius,
      );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(lightX, lightY, radius, 0, Math.PI * 2, false);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
  }

  private click() {
    console.log('CLICK');
  }
}
