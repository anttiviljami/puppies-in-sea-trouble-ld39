import * as Web3 from 'web3';

import config from '../config';

const web3 = new Web3(new Web3.providers.HttpProvider(config.GETH_URL));

export function getInstance() {
  return web3;
}
