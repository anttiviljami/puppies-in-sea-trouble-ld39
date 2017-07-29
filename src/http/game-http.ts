import * as logger from 'winston';

import * as game from '../core/game-core';

export async function getState(req, res) {
  try {
    const state = await game.getState();
    return res.json(state);
  } catch (e) {
    logger.error(e);
    return {};
  }
}
