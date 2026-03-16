import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartCount, setCartUpdateCallback } from '../utils/cartUtils';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const count = await getCartCount();
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    
    // Set callback in cartUtils to update count when cart changes
    setCartUpdateCallback(updateCartCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
