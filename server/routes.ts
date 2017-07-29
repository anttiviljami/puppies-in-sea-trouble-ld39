import * as path from 'path';
import * as logger from 'winston';
import * as express from 'express';
import * as morgan from 'morgan';

import { bindHandler } from './util/sock';

import frontend from './templates/base';
import * as gameHttp from './http/game-http';
import * as gameSock from './sock/game-sock';

import config from './config';

let io;

function configureHttp(app) {
  app.use(morgan('combined'));

  app.use('/static', express.static(path.join(__dirname, '..', 'static')));

  // main game
  app.get('/', (req, res) => {
    // serve template
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
