import * as logger from 'winston';

import { bindHandler } from './util/sock';

import frontend from './templates/base';
import * as eth from './http/eth-http';
import * as chat from './sock/chat-sock';

export function configureHttp(app) {
  // main game
  app.get('/', (req, res) => {
    // serve template
    // @TODO: figure out a nice way to render frontend
    res.send(frontend);
  });

  // get ethereum balance
  app.get('/api/getBalance', eth.getBalance);

  return app;
}

export function configureSocket(io) {
  return io.sockets.on('connection', (socket) => {
    // client connected
    logger.info('connected');
    socket.on('chat message', bindHandler(io, chat.message));
  });
}
