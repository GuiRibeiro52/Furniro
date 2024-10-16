import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCart = (newItem) => {
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

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/thankyou';

  return (
    <CartProvider>
      <div className='w-auto'>
        {!isAuthPage && <Header />}
        <div>
          <Outlet context={{ cartItems, updateCart, removeFromCart, clearCart }} />
        </div>
        {!isAuthPage && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
