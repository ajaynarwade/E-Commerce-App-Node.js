const express = require('express');
const router = express.Router();
const knex = require('../db'); // Import the database connection

// Fetch products by category
router.get('/:category/products', async (req, res) => {
    try {
        const { category } = req.params;

        // Mapping category names to database values
        const categoryMapping = {
            vegetables: 'Vegetables',
            fruits: 'Fruits',
            exoticVegetables: 'Exotic Vegetables'
        };

        if (!categoryMapping[category]) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const products = await knex('products')
            .join('categories', 'products.category_id', '=', 'categories.id')
            .where('categories.name', categoryMapping[category])
            .select(
                'products.id',
                'products.name',
                'products.b2c_base_price',
                'products.normal_discount',
                'products.description',
                'products.b2c_base_unit',
                'products.b2c_denominations',
                'products.b2c_denomination_type',
                'products.image_url'
            );

        // Formatting response like old API
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            b2c_base_price: product.b2c_base_price.toString(),
            normal_discount: product.normal_discount.toString(),
            images: [{ url: product.image_url }],
            description: product.description,
            b2c_base_unit: product.b2c_base_unit,
            b2c_denominations: product.b2c_denominations,
            b2c_denomination_type: product.b2c_denomination_type,
        }));

        res.json({ statusCode: 200, data: formattedProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
