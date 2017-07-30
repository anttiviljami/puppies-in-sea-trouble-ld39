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
    this.load.spritesheet('lighthouse', 'assets/images/lighthouse.png', 550, 726);
    this.load.image('title', 'assets/images/puppies-title.png');
    this.load.image('subtitle', 'assets/images/in-sea-trouble-subtitle.png');
    this.load.image('puppers', 'assets/images/puppers.png');
    this.load.audio('yar', ['assets/audio/yar.mp3', 'assets/audio/yar.ogg']);
  }

  public create() {
    const title = this.game.add.sprite(this.game.world.centerX, 0, 'title');
    const pup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'puppers');
    const subtitle = this.game.add.sprite(this.game.world.centerX, this.game.height, 'subtitle');

    const worldScale = this.game.world.width > 800 ? .75 : .5;

    title.anchor.setTo(0.5, 0);
    pup.anchor.setTo(0.5);
    subtitle.anchor.setTo(0.5, 1);

    title.scale.setTo(worldScale);
    subtitle.scale.setTo(worldScale);
    pup.scale.setTo(worldScale);

    this.clickText = this.add.text(
      this.game.world.centerX, (this.game.world.centerY + pup.height / 2), 'Click to start saving puppies', {});
    this.clickText.font = 'Indie Flower';
    this.clickText.fontSize = 35;
    this.clickText.fill = '#ccc';
    this.clickText.alpha = 0;
    this.clickText.anchor.setTo(0.5, 0);
    this.clickText.scale.setTo(worldScale);

    this.game.stage.disableVisibilityChange = true;
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
