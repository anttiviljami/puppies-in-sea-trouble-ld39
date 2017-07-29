import * as logger from 'winston';

export async function message(io, msg) {
  logger.info('message', msg);
  return io.emit('chat message', msg);
}
