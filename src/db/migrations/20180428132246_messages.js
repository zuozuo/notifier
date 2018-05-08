exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('level');
    table.text('content');
    table.text('response');
    table.text('description');
    table.string('title').notNullable();
    table.string('source').notNullable();
    table.string('targets').notNullable();
    table.integer('retries').defaultTo('3');
    table.integer('attampts').defaultTo('0');
    table.boolean('success').defaultTo('false');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
