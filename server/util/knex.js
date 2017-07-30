import * as knex from 'knex';
import config from '../config';

export const connect = () => knex({
  client: 'pg',
  connection: config.DATABASE_URL,
  searchPath: 'knex,public'
});
