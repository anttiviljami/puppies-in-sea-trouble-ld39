import * as Phaser from 'phaser-ce';
import {centerGameObjects} from '../utils';

export class SplashState extends Phaser.State {
  private loaderBg: Phaser.Sprite;
  private loaderBar: Phaser.Sprite;

  // init () {}

  public preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.spritesheet('doggo', 'assets/images/doggo.png', 250, 175);
  }

  public create() {
    this.game.state.start('Game');
  }
}
