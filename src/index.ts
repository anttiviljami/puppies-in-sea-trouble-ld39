import * as express from 'express';
import * as IO from 'socket.io';

import * as logger from 'winston';
import config from './config';

import base from './templates/base';

const app = express();

app.get('/', (req, res) => {
  res.send(base);
});

const server = app.listen(config.PORT, () => {
  logger.info('listening on *:' + config.PORT);
});

const io = IO.listen(server);
io.sockets.on('connection', (socket) => {
  logger.info('connected');
  socket.on('chat message', (msg) => {
    logger.info('message:', msg);
    io.emit('chat message', msg);
  });
});
