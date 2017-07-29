import * as logger from 'winston';
import { promisify } from 'bluebird';

import BigNumber from 'bignumber.js';
import * as Web3 from '../util/web3';

import config from '../config';

let balance = new BigNumber(-1);

export async function getBalance({ cache } = { cache: true }) {
  // cache
  if (balance.toNumber() === -1 && !cache) {
    return balance;
  }

  const web3 = Web3.getInstance();
  if ( web3.isConnected() ) {
    const getBalanceAsync = promisify(web3.eth.getBalance);
    balance = await getBalanceAsync(config.ETH_ADDRESS);
    logger.silly('ETH account balance: ', balance.toString(10));
  }
  return balance;
}
