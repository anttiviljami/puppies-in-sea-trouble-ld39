import * as logger from 'winston';

import { bindHandler } from './util/sock';

import frontend from './templates/base';
import * as gameHttp from './http/game-http';
import * as gameSock from './sock/game-sock';

import config from './config';

let io;

function configureHttp(app) {
  // main game
  app.get('/', (req, res) => {
    // serve template
    // @TODO: figure out a nice way to render static frontend
    res.send(frontend);
  });

  // get full game state
  app.get('/api/getState', gameHttp.getState);

  // reset the game
  if ( config.NODE_ENV !== 'production' ) {
    app.get('/api/reset', gameHttp.resetGame);
  }
  return app;
}

function configureSocket(ioInstance) {
  io = ioInstance;

  return io.sockets.on('connection', (socket) => {
    // client connected
    logger.info('connected');

    socket.on('charge', bindHandler(io, gameSock.charge));
  });
}

export {
  configureSocket,
  configureHttp,
  io,
};
