import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';

export class BootState extends Phaser.State {
  public stage: Phaser.Stage;
  private fontsReady: boolean;

  public init() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.stage.backgroundColor = '#000';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  public preload() {
    WebFont.load({
      google: {
        families: ['Acme'],
      },
      active: this.fontsLoaded,
    });

    const { centerX, centerY } = this.world;

    const text = this.add.text(centerX, centerY, 'Loading...', {
      font: '18px sans-serif',
      fill: '#ccc',
      align: 'center',
    });
    text.anchor.setTo(0.5, 0.5);

    //
    // load your assets
    //
    this.load.spritesheet('doggo', 'assets/images/doggo.png', 250, 175);
    this.load.spritesheet('lighthouse', 'assets/images/lighthouse.png', 550, 726);
    this.load.image('title', 'assets/images/puppies-title.png');
    this.load.image('subtitle', 'assets/images/in-sea-trouble-subtitle.png');
    this.load.image('puppers', 'assets/images/puppers.png');
    this.load.audio('yar', ['assets/audio/yar.mp3', 'assets/audio/yar.ogg']);
    this.load.audio('death0', ['assets/audio/death0.mp3', 'assets/audio/death0.ogg']);
    this.load.audio('death1', ['assets/audio/death1.mp3', 'assets/audio/death1.ogg']);
    this.load.audio('woof0', ['assets/audio/woof0.mp3', 'assets/audio/woof0.ogg']);
    this.load.audio('woof1', ['assets/audio/woof1.mp3', 'assets/audio/woof1.ogg']);
    this.load.audio('warning', ['assets/audio/warning.mp3', 'assets/audio/warning.ogg']);
    this.load.audio('powerup', ['assets/audio/powerup.mp3', 'assets/audio/powerup.ogg']);
  }

  public render() {
    if (this.fontsReady) {
      this.game.state.start('Splash');
    }
  }

  public fontsLoaded() {
    this.fontsReady = true;
  }
}
