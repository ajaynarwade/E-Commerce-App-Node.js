/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.decimal('b2c_base_price', 10, 2).notNullable();
        table.decimal('normal_discount', 10, 2).notNullable();
        table.text('description');
        table.string('b2c_base_unit').notNullable();
        table.string('b2c_denominations');
        table.string('b2c_denomination_type');
        table.string('image_url');
        table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};
