import * as logger from 'winston';
import * as game from '../core/game-core';

export async function charge(io, msg) {
  logger.info('charged!');
  return await game.charge();
}
