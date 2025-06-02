import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import './Cart.css'
function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext)

    const handleRemove = (id) => {
        removeFromCart(id);
    }
    const handlequantityChange = (id, quantity) => {
        if (quantity > 0){
            updateQuantity(id, quantity);
        }else{
            removeFromCart(id);
        }
    }
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }


  return (
    <div className="cart-page">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
            <div className="empty-cart">
            <p>Your cart is empty  <i className="mdi mdi-cart-off"></i></p>
            </div>
        ) : (
            <div className="cart-items-list">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p className='cart-item-price'>Price: ${item.price.toFixed(2)}</p>
                        <div className='cart-item-quantity-controls'>
                            <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                            <input type="number" 
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handlequantityChange(item.id, parseInt(e.target.value))}
                            className="input-quantity"
                            />
                            <button onClick={() => handleRemove(item.id)} className="btn btn-remove">
                                <i className="mdi mdi-delete"></i>
                            </button> 
                        </div>
                        <p className='cart-item-price'>Subtotal: ${(item.price*item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <button className="btn-clear-cart" onClick={() => cartItems.forEach(item => handleRemove(item.id))}>
                    Clear Cart
                </button>
                <hr />
                <div className="cart-summary">
                    <h3 className='cart-item-total'>Total: ${calculateTotal()}</h3>
                    <button className="btn btn-checkout">Proceed to Checkout</button>
                </div>
            </div>
        )}    
    </div>
  )
}

export default Cart