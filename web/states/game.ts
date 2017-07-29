import * as Phaser from 'phaser-ce';
import { Mushroom } from '../sprites/mushroom';
import { setResponsiveWidth } from '../utils';

export class GameState extends Phaser.State {
  private mushroom: Mushroom;

  // init () {}
  public preload() {
    this.game.load.image('button', 'assets/images/mushroom.png');
  }

  public create() {
    const banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Puppies in Sea Trouble', {});
    banner.font = 'Nunito';
    banner.fontSize = 35;
    banner.fill = '#111';
    banner.anchor.setTo(0.5);

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom',
    });

    const button = this.game.add.button(this.game.world.centerX, this.game.height - 100, 'button', this.click, this, 2, 1, 0);

    // set the sprite width to 30% of the game width
    setResponsiveWidth(this.mushroom, 30, this.game.world);
    setResponsiveWidth(button, 30, this.game.world);
    this.game.add.existing(this.mushroom);
  }

  public render() {
    if (window['__DEV__']) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }

  private click() {
    console.log('CLICK');
  }
}
