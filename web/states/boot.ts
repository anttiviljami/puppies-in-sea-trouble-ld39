import * as Phaser from 'phaser-ce';
import * as WebFont from 'webfontloader';

export class BootState extends Phaser.State {
  public stage: Phaser.Stage;
  private fontsReady: boolean;

  public init() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.stage.backgroundColor = '#02426E';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  public preload() {
    WebFont.load({
      google: {
        families: ['Artifika'],
      },
      active: this.fontsLoaded,
    });

    const { centerX, centerY } = this.world;

    const text = this.add.text(centerX, centerY, 'Loading...', {
      font: '18px sans-serif',
      fill: '#fff',
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
