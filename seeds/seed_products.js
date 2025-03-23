/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
      {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Sample Product 1',
          b2c_base_price: 100.00,
          normal_discount: 10.00,
          description: 'This is a sample product',
          b2c_base_unit: 'piece',
          b2c_denominations: '1kg,2kg',
          b2c_denomination_type: 'weight',
          image_url: 'https://via.placeholder.com/150',
          category_id: '123e4567-e89b-12d3-a456-426614174008',
      },
      {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'Sample Product 2',
          b2c_base_price: 200.00,
          normal_discount: 15.00,
          description: 'Another sample product',
          b2c_base_unit: 'pack',
          b2c_denominations: '500g,1kg',
          b2c_denomination_type: 'weight',
          image_url: 'https://via.placeholder.com/150',
          category_id: '123e4567-e89b-12d3-a456-426614174008',
      }
  ]);
};
