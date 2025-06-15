import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; 

function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext); 

    const handleAddToCart = () => {
        if (quantity > 0) { 
            addToCart(product, quantity);
            setQuantity(1); 
            alert(`${quantity} of ${product.name} added to cart!`); 
        } else {
            alert("Please enter a valid quantity.");
        }
    };

    return (
        <div className="product-container">
            <div className="stock">
                {product.stock}x 
            </div>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} /> 
            <h1>${Number(product.price).toFixed(2)}</h1> 

            <div className="input-wrapper">
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="input-quantity"
                />
                <button onClick={handleAddToCart} className="btn">
                    🛒 
                </button>
            </div>
        </div>
    );
}

export default ProductCard;