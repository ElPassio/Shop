const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Construct the absolute path to client's public folder
const clientPublicPath = path.join(__dirname, '..', 'client', 'public');
// Define CORS options
// This allows requests from the React app running on port 5173
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 100, image: '/images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 10 },
    { id: 2, name: 'Product 2', price: 200, image: '/images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 20 },
    { id: 3, name: 'Product 3', price: 300, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 30 },
    { id: 4, name: 'Product 4', price: 400, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 40 },
    { id: 5, name: 'Product 5', price: 500, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 50 },
    { id: 6, name: 'Product 6', price: 600, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 60 },
    { id: 7, name: 'Product 7', price: 700, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 70 },
    { id: 8, name: 'Product 8', price: 800, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 80 },
    { id: 9, name: 'Product 9', price: 900, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 90 },
    { id: 10, name: 'Product 10', price: 1000, image: 'images/key.be0a5e2cda3a039132c35b67319829d785e50352.png', stock: 100 } 
];


// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors(corsOptions));

// Serve static files from the client's public directory
app.use(express.static(clientPublicPath));

// Serve the React app
app.get('/api/products', (req, res) => {
    res.send(products);
});

// Serve a specific product by ID
app.get('/api/products/:id', (req, res) => {
    res.send()
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

