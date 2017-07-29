import * as logger from 'winston';

import { bindHandler } from './util/sock';

import frontend from './templates/base';
import * as gameHttp from './http/game-http';
import * as gameSock from './sock/game-sock';
import * as chatSock from './sock/chat-sock';

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

  return app;
}

function configureSocket(ioInstance) {
  io = ioInstance;

  return io.sockets.on('connection', (socket) => {
    // client connected
    logger.info('connected');

    socket.on('chat message', bindHandler(io, chatSock.message));
    socket.on('charge', bindHandler(io, gameSock.charge));
  });
}

export {
  configureSocket,
  configureHttp,
  io,
};
