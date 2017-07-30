exports.up = function up(knex, Promise) {
  const game = knex.schema.createTable('config', table => {
    // auto increment
    table.increments('id').unsigned().primary().index();

    // data
    table.string('key').unique();
    table.jsonb('value');

    // updated_at and created_at timestamps
    table.timestamps(true, true);
  });

  return Promise.resolve(true)
    .then(() => game);
};

exports.down = function down(knex, Promise) {
  return Promise.resolve(true)
    .then(() => knex.schema.dropTable('config'));
};
