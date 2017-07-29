import * as Phaser from 'phaser-ce';

export class SplashState extends Phaser.State {
  private clickText: Phaser.Text;
  private loaderBar: Phaser.Sprite;

  // init () {}

  public preload() {
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    // this.loaderBar.anchor.setTo(0.5);

    //
    // load your assets
    //
    this.load.spritesheet('doggo', 'assets/images/doggo.png', 250, 175);
    this.load.image('lighthouse', 'assets/images/lighthouse.png');
    this.game.load.audio('yar', ['assets/audio/yar.mp3', 'assets/audio/yar.ogg']);
  }

  public create() {
    this.clickText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Click anywhere to begin.', {});
    this.clickText.font = 'Indie Flower';
    this.clickText.fontSize = 35;
    this.clickText.fill = '#fff';
    this.clickText.alpha = 0;
    this.clickText.anchor.setTo(0.5);
  }

  public render() {
    if (this.clickText.alpha < 1 ) {
      this.clickText.alpha += .01;
    } else {
      this.clickText.alpha = 1;
    }
    if (this.game.input.activePointer.leftButton.justReleased()) {
      this.start();
    }
  }

  private start() {
    this.game.state.start('Game');
  }
}
