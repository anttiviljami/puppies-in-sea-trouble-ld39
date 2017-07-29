import * as IO from 'socket.io';
import * as logger from 'winston';

import app from './app';
import * as routes from './routes';
import config from './config';

const server = app().listen(config.PORT, () => {
  logger.info(`listening on *:${config.PORT}`);
});

routes.configure();

const io = IO.listen(server);
io.sockets.on('connection', (socket) => {
  logger.info('connected');
  socket.on('chat message', (msg) => {
    logger.info('message:', msg);
    io.emit('chat message', msg);
  });
});
