import * as Phaser from 'phaser-ce';
import { Doggo } from '../sprites/doggo';
import { setResponsiveWidth } from '../utils';

export class GameState extends Phaser.State {
  private doggo: Doggo;

  // init () {}
  public preload() {
    this.game.load.image('button', 'assets/images/lighthouse.png');
  }

  public create() {

    this.doggo = new Doggo({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'doggo',
    });

   const button = this.game.add.button(0, this.game.height, 'button', this.click, this, 2, 1, 0);
   button.anchor.setTo(0, 1);

    // set the sprite width to 30% of the game width
    setResponsiveWidth(button, 40, this.game.world);
    this.game.add.existing(this.doggo);

    const banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Puppies in Sea Trouble', {});
    banner.font = 'Nunito';
    banner.fontSize = 35;
    banner.fill = '#fff';
    banner.anchor.setTo(0.5);
  }

  public render() {
    if (window['__DEV__']) {
      this.game.debug.spriteInfo(this.doggo, 32, 32);
    }
  }

  private click() {
    console.log('CLICK');
  }
}
