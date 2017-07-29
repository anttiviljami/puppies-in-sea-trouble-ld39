import * as logger from 'winston';
import * as eth from '../core/eth-core';

export async function getBalance(req, res) {
  try {
    const balance = await eth.getBalance();
    return res.json({ balance });
  } catch (e) {
    logger.error(e);
    return { balance: 0 };
  }
}
