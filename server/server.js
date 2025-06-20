const path = require('path');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // 1. Importamos mysql2/promise

const app = express();
const PORT = 3000;

// --- 2. Configuración de la Conexión a la Base de Datos ---
// Crea un "pool" de conexiones, que es más eficiente que una única conexión.
const pool = mysql.createPool({
    host: 'localhost',          // O la IP de tu servidor de BD
    user: 'root',         // Tu usuario de MySQL
    password: '',    // Tu contraseña de MySQL
    database: 'shop', // El nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Construct the absolute path to client's public folder
const clientPublicPath = path.join(__dirname, '..', 'client', 'public');
app.use(express.static(clientPublicPath));

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

// --- ELIMINAMOS EL ARRAY 'products' DE EJEMPLO ---
// const products = [ ... ]; // Ya no lo necesitamos

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors(corsOptions));

// --- 3. Modificamos la ruta /api/products ---
app.get('/api/products', async (req, res) => { // La convertimos en una función asíncrona
    try {
        // Obtenemos una conexión del pool
        const connection = await pool.getConnection(); 
        
        // Ejecutamos la consulta para obtener todos los productos de la tabla 'stock'
        const [rows] = await connection.query(`SELECT 
                p.product_id AS id,
                p.name,
                p.price,
                p.image_url AS image,
                s.quantity AS stock
                FROM products p
                JOIN stock s ON p.product_id = s.product_id
                WHERE p.is_active = 1`);

        // Liberamos la conexión para que otros puedan usarla
        connection.release(); 
        
        // Enviamos los resultados de la base de datos como respuesta JSON
        res.json(rows);

    } catch (error) {
        // Si algo sale mal, lo mostramos en la consola del servidor
        console.error('Error al obtener los productos de la base de datos:', error);
        
        // Y enviamos un error 500 al cliente
        res.status(500).json({ error: 'Error interno del servidor al consultar los productos.' });
    }
});
app.post('/api/checkout', async (req, res) => {
    const cartItems = req.body; // [{ id: 1, quantity: 2 }, ...]

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'Carrito vacío o malformado' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction(); // 🌀 Transacción para asegurar atomicidad

        const updatedStocks = [];

        for (const item of cartItems) {
            const [rows] = await connection.query(
                `SELECT quantity FROM stock WHERE product_id = ? FOR UPDATE`,
                [item.id]
            );

            if (rows.length === 0) {
                throw new Error(`Producto con ID ${item.id} no encontrado`);
            }

            const currentStock = rows[0].quantity;

            if (currentStock < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${item.id}`);
            }

            // Actualizamos stock
            const newStock = currentStock - item.quantity;
            await connection.query(
                `UPDATE stock SET quantity = ? WHERE product_id = ?`,
                [newStock, item.id]
            );

            updatedStocks.push({ id: item.id, stock: newStock });
        }

        await connection.commit(); // ✅ Confirmamos cambios
        res.json(updatedStocks);   // Enviamos los nuevos stocks

    } catch (error) {
        await connection.rollback(); // ❌ Cancelamos cambios ante error
        console.error("Error en /api/checkout:", error);
        res.status(400).json({ message: error.message });
    } finally {
        connection.release();
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});