import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; // We'll create this
import { CartProvider } from './context/CartContext'; // We'll create this

import './App.css'; // Your main app styles
import './index.css'; // Your global styles

function App() {
    return (
        <Router>
            <CartProvider> {/* Wrap your entire app with the CartProvider */}
                <Header />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Add other routes if you have them, e.g., /product/:id */}
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;