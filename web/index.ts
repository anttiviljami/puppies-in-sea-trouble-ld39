import * as Phaser from 'phaser-ce';

import { BootState } from './states/boot';
import { SplashState } from './states/splash';
import { GameState } from './states/game';

class Game extends Phaser.Game {
  public music = Phaser.Sound;

  constructor() {
    super('100%', '100%', Phaser.AUTO, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }
}

export const game = new Game();
