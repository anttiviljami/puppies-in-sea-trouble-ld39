exports.up = function up(knex, Promise) {
  const game = knex.schema.createTable('game', table => {
    // auto increment
    table.increments('id').unsigned().primary().index();

    // data
    table.string('key').index();
    table.string('value');

    // updated_at and created_at timestamps
    table.timestamps(true, true);
  });

  return Promise.resolve(true)
    .then(() => game);
};

exports.down = function down(knex, Promise) {
  return Promise.resolve(true)
    .then(() => knex.schema.dropTable('game'));
};
