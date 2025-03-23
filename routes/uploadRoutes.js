// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { Pool } = require('pg');

// const router = express.Router();
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
// });

// // Configure Multer Storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Store files in the "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Rename file
//     },
// });

// const upload = multer({ storage });

// // ✅ Upload Image API
// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const imageUrl = req.file.filename;

//         res.json({
//             message: 'Image uploaded successfully',
//             imageUrl: `http://localhost:5000/uploads/${imageUrl}`
//         });
//     } catch (err) {
//         console.error('❌ Error uploading image:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // ✅ Insert Product API (with Image URL)
// router.post('/products', async (req, res) => {
//     try {
//         const { name, description, b2c_base_price, normal_discount, category_id, image_url } = req.body;

//         const query = `
//             INSERT INTO products (id, name, description, b2c_base_price, normal_discount, category_id, image_url, created_at, updated_at) 
//             VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
//             RETURNING *;
//         `;

//         const values = [name, description, b2c_base_price, normal_discount, category_id, image_url];

//         const result = await pool.query(query, values);

//         res.json({ message: 'Product added successfully', product: result.rows[0] });
//     } catch (err) {
//         console.error('❌ Error adding product:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;
