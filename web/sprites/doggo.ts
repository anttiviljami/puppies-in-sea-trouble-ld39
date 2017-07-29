import * as Phaser from 'phaser-ce';

export class Doggo extends Phaser.Sprite {

  constructor({ game, x, y, asset, variant }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);

    this.animations.add('waggle0', [0, 1]);
    this.animations.add('waggle1', [2, 3]);
    this.animations.add('waggle2', [4, 5]);
    this.play('waggle' + variant, 6, true);
  }

  public update() {
    this.scale.setTo(.5);
    this.rotation = Math.sin(this.game.time.now * .002) * .25;
  }
}
