import * as logger from 'winston';

import * as game from '../core/game-core';

export async function getState(req, res) {
  try {
    const state = await game.getState();
    return res.json(state);
  } catch (e) {
    logger.error(e);
    return res.json({});
  }
}

export async function resetGame(req, res) {
  await game.reset();
  logger.info('GAME RESET');
  return res.json({ success: 1 });
}
