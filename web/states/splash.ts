import * as Phaser from 'phaser-ce';

export class SplashState extends Phaser.State {
  private clickText: Phaser.Text;
  private loaderBar: Phaser.Sprite;

  // init () {}

  public preload() {
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    // this.loaderBar.anchor.setTo(0.5);
    this.stage.backgroundColor = '#02426E';
  }

  public create() {
    const title = this.game.add.sprite(this.game.world.centerX, 0, 'title');
    const pup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'puppers');
    const subtitle = this.game.add.sprite(this.game.world.centerX, this.game.height, 'subtitle');

    const worldScale = this.game.world.width > 800 ? .75 : .5;

    title.anchor.setTo(0.5, 0);
    pup.anchor.setTo(0.5);
    subtitle.anchor.setTo(0.5, 1);

    title.scale.setTo(worldScale * .75);
    subtitle.scale.setTo(worldScale * .75);
    pup.scale.setTo(worldScale);

    this.clickText = this.add.text(
      this.game.world.centerX, (this.game.world.centerY + pup.height / 2), 'Click to start saving puppies', {});
    this.clickText.font = 'Acme';
    this.clickText.fontSize = 30;
    this.clickText.fill = '#ccc';
    this.clickText.alpha = 0;
    this.clickText.anchor.setTo(0.5, 0);
    this.clickText.scale.setTo(worldScale);

    this.game.stage.disableVisibilityChange = true;
    this.game.input.onDown.add(this.start, this);
  }

  public render() {
    if (this.clickText.alpha < 1 ) {
      this.clickText.alpha += .01;
    } else {
      this.clickText.alpha = 1;
    }
  }

  private start() {
    this.game.state.start('Game');
  }
}
