import * as logger from 'winston';
import { promisify } from 'bluebird';

import * as Web3 from '../util/web3';

import config from '../config';

export async function getBalance() {
  const web3 = Web3.getInstance();
  logger.info('Connection: ', web3.isConnected());

  const getBalanceAsync = promisify(web3.eth.getBalance);
  const balance = await getBalanceAsync(config.ETH_ADDRESS);
  logger.info('ETH account balance: ', balance);

  return balance;
}
