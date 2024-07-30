import { useCart } from '../context/CartContext'; // Import the Cart context
import BannerBot from "../components/BannerBot";
import BannerTop from "../components/BannerTop";
import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateCart, removeFromCart } = useCart(); // Use the Cart context
  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));

  useEffect(() => {
    setQuantities(cartItems.map(item => item.quantity));
  }, [cartItems]);

  const handleQuantityChange = (index, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
    updateCart({ ...cartItems[index], quantity: newQuantity });
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const totalPrice = cartItems.reduce((total, item, index) => total + item.price * quantities[index], 0);

  return (
    <div>
      <BannerTop pageName="Cart"/>
      <div className="container mx-auto py-10 font-poppins flex justify-between">
        <table className="w-[817px] h-[55px] text-left">
          <thead className='bg-subheader'>
            <tr>
              <th></th>
              <th className='p-3 font-medium'>Product</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium'>Quantity</th>
              <th className='p-3 font-medium'>Subtotal</th>
              <th className='p-3 font-medium'></th>          
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id} >
                <td className="py-4 flex items-center">
                  <img src={`${item.image}`} alt={item.title} className="w-20 h-20 object-cover rounded mr-4"/>                
                </td>
                <td>
                  <span className='text-secondary'>{item.title}</span>
                </td>
                <td className="py-4 text-secondary">
                  R$ {item.price.toFixed(2)}
                </td>
                <td className="py-4">
                  <div className="flex items-center border w-[100px] justify-between rounded-xl">
                    <button
                      onClick={() => handleQuantityChange(index, Math.max(1, quantities[index] - 1))}
                      className="px-3 py-2 "
                    >
                      -
                    </button>
                    <span className="mx-2 font-medium">{quantities[index]}</span>
                    <button
                      onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                      className="px-3 py-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4">R$ {(item.price * quantities[index]).toFixed(2)}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-button  w-6 h-6 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex">
          <div className=" bg-subheader p-6 rounded  w-[393px] h-[393px]">
            <div className='flex justify-center font-semibold mb-14'>
              <h2 className="text-[32px]  mb-4">Cart Totals</h2>
            </div>
            <div className="flex justify-between mb-8 px-10">
              <span>Subtotal</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-12 px-10">
              <span>Total</span>
              <span className="text-yellow-500 font-bold">R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className='flex justify-center'>
              <Link to="/checkout">
                <button className="w-[222px] py-2 mt-4 border border-black rounded-2xl text-xl">Check Out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BannerBot />
    </div>
  );
};

export default Cart;
