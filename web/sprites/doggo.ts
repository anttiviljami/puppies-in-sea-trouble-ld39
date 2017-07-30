import * as Phaser from 'phaser-ce';

export class Doggo extends Phaser.Sprite {
  public spawned;
  public variant;

  private startX;
  private startY;
  private targetX;
  private targetY;

  constructor({ game, asset, variant, spawned, targetX, targetY }) {
    const startX = game.width - 100;
    const startY = -100;

    super(game, startX, startY, asset);

    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;

    this.spawned = spawned;
    this.variant = variant;

    this.game = game;
    this.anchor.setTo(0.5);

    this.animations.add('waggle0', [0, 1]);
    this.animations.add('waggle1', [2, 3]);
    this.animations.add('waggle2', [4, 5]);
    this.play('waggle' + this.variant, 6, true);
  }

  public update() {
    this.scale.setTo(.5);
    this.rotation = Math.sin((this.game.time.now + this.spawned) * .002) * .25;

    const progress = 1 - ((this.spawned + 35000) - this.game.time.now) / 35000;
    this.x = this.startX + (this.targetX - this.startX) * progress;
    this.y = this.startY + (this.targetY - this.startY) * progress;

    if (progress > 1) {
      this.destroy();
    }
  }
}
