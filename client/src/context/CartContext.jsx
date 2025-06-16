import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
       try {
        const localCart= localStorage.getItem("cartItems");
        return localCart ? JSON.parse(localCart) : [];
       } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        return [];
       }
    });
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    const restoreStock = (productId, quantity) => {
    const currentStock = parseInt(localStorage.getItem(`stock_${productId}`)) || 0;
    const newStock = currentStock + quantity;
    localStorage.setItem(`stock_${productId}`, newStock);
};
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingItemIndex > -1) {
                // If the item already exists, update its quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // If the item does not exist, add it to the cart
                return [...prevItems, { ...product, quantity }];
            }
        });  
    }
    const removeFromCart = (id) => {
    setCartItems((prevItems) => {
        const itemToRemove = prevItems.find(item => item.id === id);
        if (itemToRemove) {
            restoreStock(id, itemToRemove.quantity);
        }
        return prevItems.filter(item => item.id !== id);
    });
};
    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) => {
            prevItems.map(item => 
                item.id === id ? { ...item, quantity : newQuantity} : item
            );
        });
    }          
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }} >
            {children}
        </CartContext.Provider>
    );
}
