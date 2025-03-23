/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    { id: '123e4567-e89b-12d3-a456-426614174001', name: 'Vegetables', description: 'Fresh vegetables' },
    { id: '123e4567-e89b-12d3-a456-426614174008', name: 'Fruits', description: 'Organic fruits' },
    { id: '123e4567-e89b-12d3-a456-426614174011', name: 'Exotic Vegetables', description: 'Rare and unique veggies' },
  ]);
};
