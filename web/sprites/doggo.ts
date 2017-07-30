import * as Phaser from 'phaser-ce';
import * as seedrandom from 'seedrandom';

export class Doggo extends Phaser.Sprite {
  public spawned;
  public variant;

  private startX;
  private startY;
  private targetX;
  private targetY;

  private woof;
  private death;

  private callback;

  constructor({ game, asset, variant, spawned, targetX, targetY, id, callback }) {
    const rng = seedrandom(id);

    // random starting point
    const corner = Math.floor(rng() * 2); // 0 = top 1 = right
    let startX;
    let startY;
    if (corner === 0) {
      startX = game.width - (rng() * game.world.width / 4);
      startY = -100;
    }
    if (corner === 1) {
      startX = game.width + 100;
      startY = rng() * (game.world.height / 2);
    }

    super(game, startX, startY, asset);

    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;

    this.spawned = spawned;
    this.variant = variant;

    this.game = game;
    this.callback = callback;
    this.anchor.setTo(0.5);

    this.animations.add('waggle0', [0, 1]);
    this.animations.add('waggle1', [2, 3]);
    this.animations.add('waggle2', [4, 5]);
    this.play('waggle' + this.variant, 6, true);

    this.woof = this.game.add.audio('woof' + Math.floor(rng() * 2), .75);
    this.death = this.game.add.audio('death' + Math.floor(rng() * 2));
  }

  public update() {
    this.rotation = Math.sin((this.game.time.now + this.spawned) * .002) * .25;

    const progress = 1 - ((this.spawned + 35000) - this.game.time.now) / 35000;
    this.x = this.startX + (this.targetX - this.startX) * Math.pow(progress, 2);
    this.y = this.startY + (this.targetY - this.startY) * progress;

    if (progress > 1) {
      this.callback(this);
    }
  }
}
