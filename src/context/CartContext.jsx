import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
  );

  // Add to cart function
  const addToCart = (item, size) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id && cartItem.size === size);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, size: size }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size);
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => !(cartItem.id === item.id && cartItem.size === item.size)));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total function
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.retailPrice * item.quantity, 0);
  };

  // Set cart in local storage effect
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Get cart items from local storage effect
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};
