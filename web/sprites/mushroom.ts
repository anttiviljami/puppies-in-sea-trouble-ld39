import * as Phaser from 'phaser-ce';

export class Mushroom extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
  }

  public update() {
    this.angle += 1;
  }
}
