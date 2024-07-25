import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <div className='w-auto'>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <div>
        <Outlet context={{ updateCart }} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
