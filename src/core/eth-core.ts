import * as logger from 'winston';
import { promisify } from 'bluebird';

import * as Web3 from '../util/web3';

import config from '../config';

let balance = "";

export async function getBalance({ cache } = { cache: true }) {
  // cache
  if (balance === "" && !cache) {
    return balance;
  }

  const web3 = Web3.getInstance();
  if ( web3.isConnected() ) {
    const getBalanceAsync = promisify(web3.eth.getBalance);
    balance = await getBalanceAsync(config.ETH_ADDRESS);
    logger.info('ETH account balance: ', balance.toString(10));
  }
  return balance;
}
