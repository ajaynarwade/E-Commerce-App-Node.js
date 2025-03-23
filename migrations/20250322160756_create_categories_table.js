/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', (table) => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories');
  };
  