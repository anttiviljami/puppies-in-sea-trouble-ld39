import * as logger from 'winston';

export async function message(io, msg) {
  logger.info('game event', msg);
  return io.emit('game event', msg);
}
