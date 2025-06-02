    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Header from './components/Header';
    import ProductList from './components/ProductList';
    import Cart from './components/Cart'; 
    import Footer from './components/Footer'; 
    import { CartProvider } from './context/CartContext';
    import './App.css';
    import './index.css';

    function App() {
        return (
            <Router>
                <CartProvider>
                    <div className="app-container">
                        <Header />
                        <main className="content">
                            <Routes>
                                <Route path="/" element={<ProductList />} />
                                <Route path="/cart" element={<Cart />} />  
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </Router>
        );
    }

    export default App;