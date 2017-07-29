import * as logger from 'winston';
import * as express from 'express';
import * as IO from 'socket.io';

import * as routes from './routes';
import * as game from './core/game-core';
import config from './config';

const app = express();
const server = app.listen(config.PORT, () => {
  logger.info(`listening on *:${config.PORT}`);
});

const io = IO.listen(server);

routes.configureHttp(app);
routes.configureSocket(io);
game.start(io);
