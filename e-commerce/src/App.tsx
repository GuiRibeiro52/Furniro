import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

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

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='w-auto'>
      {!isAuthPage && <Header cartItems={cartItems} removeFromCart={removeFromCart} />}
      <div>
        <Outlet context={{ cartItems, updateCart, removeFromCart }} />
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;

