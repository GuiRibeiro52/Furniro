import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCart: (newItem: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const defaultCartContext: CartContextType = {
  cartItems: [],
  updateCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity = newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);