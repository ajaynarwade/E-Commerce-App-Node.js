require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

// Initialize Express App
const app = express();

// Configure CORS (Allow all origins or specify allowed ones)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware: Increase request size limit to prevent PayloadTooLargeError
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/uploads', express.static('uploads'));


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,  // Ensure the correct variable name
    port: process.env.DB_PORT,
});


// ✅ API: Fetch All Categories
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.json({ statusCode: 200, data: result.rows });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ API: Fetch Products by Category ID
app.get('/api/categories/:categoryId/products', async (req, res) => {
    try {
        const { categoryId } = req.params;

        const query = `
            SELECT 
                p.id, 
                p.name, 
                p.b2c_base_price, 
                p.normal_discount, 
                p.image_url, 
                p.description, 
                p.b2c_base_unit, 
                p.b2c_denominations, 
                p.b2c_denomination_type 
            FROM products p
            WHERE p.category_id = $1
        `;
        const result = await pool.query(query, [categoryId]);

        // Format response like older API
        const formattedProducts = result.rows.map(product => ({
            id: product.id,
            name: product.name,
            b2c_base_price: product.b2c_base_price?.toString() || "0",
            normal_discount: product.normal_discount?.toString() || "0",
            images: product.image_url ? [{ url: product.image_url }] : [],
            description: product.description || "",
            b2c_base_unit: product.b2c_base_unit || "",
            b2c_denominations: product.b2c_denominations || "",
            b2c_denomination_type: product.b2c_denomination_type || "",
        }));

        res.json({ statusCode: 200, data: formattedProducts });
    } catch (err) {
        console.error(`Error fetching products for category ${req.params.categoryId}:`, err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
