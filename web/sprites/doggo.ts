import * as Phaser from 'phaser-ce';

export class Doggo extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);

    this.animations.add('waggle', [0, 1]);
    this.play('waggle', 6, true);
  }

  public update() {
    this.rotation = Math.sin(this.game.time.now * .002) * .25;
  }
}
