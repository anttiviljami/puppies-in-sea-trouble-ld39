const db = {
	client: 'pg',
	connection: process.env.DATABASE_URL,
	pool: {
		min: 2,
		max: 10,
		ping: (conn, cb) => conn.query('SELECT 1', cb),
	},
	migrations: {
		directory: './db/migrations',
		tableName: 'migrations',
	},
	seeds: {
		directory: './db/seeds',
	},
}

module.exports = {
  development: db,
  staging: db,
  production: db,
}
