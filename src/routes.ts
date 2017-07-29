import app from './app';

import base from './templates/base';
import * as ethHttp from './http/eth-http';

export function configure() {
  app().get('/', (req, res) => {
    res.send(base);
  });

  app().get('/api/getBalance', ethHttp.getBalance);
}
