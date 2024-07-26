import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig.js';

const Header = ({ cartItems, removeFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleUserClick = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      setIsCartOpen(false);
      setIsUserModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    auth.signOut();
    handleCloseUserModal();
  };

  return (
    <header className='flex items-center justify-between ml-12 mr-24 mt-8 mb-8'>
      <div>
        <Link to={'/'}><img src={logo} alt="logo Furniro" /></Link>
      </div>
      <div>
        <ul className='flex gap-[75px]'>
          <li className='font-poppins text-base font-medium'><Link to={"/"}>Home</Link></li>
          <li className='font-poppins text-base font-medium'><Link to={"/shop"}>Shop</Link></li>
          <li className='font-poppins text-base font-medium'><Link to={"/about"}>About</Link></li>
          <li className='font-poppins text-base font-medium'><Link to={"/contact"}>Contact</Link></li>
        </ul>
      </div>
      <div className='flex gap-8 items-center relative'>
        <div className='relative cursor-pointer font-poppins' onClick={handleUserClick}>
          <FaRegUser size={24} />
        </div>
        <div className='relative cursor-pointer font-poppins' onClick={handleCartClick}>
          <AiOutlineShoppingCart size={28} />
          {totalItems > 0 && (
            <span className='absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
              {totalItems}
            </span>
          )}
        </div>
      </div>
      {isUserModalOpen && (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-20 z-40' onClick={handleUserClick}></div>
          <div className='fixed top-0 right-0 w-[430px] h-[746px] bg-white shadow-lg z-50 p-4 font-poppins flex flex-col justify-center rounded-xl'>
            {user ? (
              <>
                <p className='text-center mb-10'>Logado como: {user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded self-center w-[222px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className='text-center mb-10'>Parece que você não está logado</p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-4 px-4 py-2 bg-button text-white rounded self-center w-[222px]"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </>
      )}
      {isCartOpen && (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-20 z-40' onClick={handleCartClick}></div>
          <div className='fixed top-0 right-0 w-[430px] h-[746px] bg-white shadow-lg z-50 p-4 font-poppins flex flex-col rounded-xl'>
            <div className='border-b w-[287px]'>
              <h2 className='text-xl font-bold mb-4 mt-4'>Shopping Cart</h2>
            </div>
            <div className='overflow-y-auto flex-grow'>
              <ul>
                {cartItems.map(item => (
                  <li key={item.id} className='flex justify-between items-center mb-4'>
                    <div className='flex items-center pt-[42px]'>
                      <img src={`/${item.image}`} alt={item.title} className='w-24 h-24 object-cover rounded'/>
                      <div className='ml-4'>
                        <p className='font-normal'>{item.title}</p>
                        <p className='font-light text-base'>{item.quantity} x <span className='text-button font-bold text-xs'>R$ {item.price.toFixed(2)}</span></p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <p className='font-medium'>R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='ml-4 bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center'
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='mt-4 pt-4 mb-7'>
              <div className='flex justify-between border-b'>
                <p className='font-nomal text-base '>Subtotal: </p>
                <p className='font-bold text-button mb-[23px]'>R$ {totalPrice.toFixed(2)}</p>
              </div>
              <div className='flex justify-between mt-4 text-xs'>
                <Link to="/cart" onClick={handleCloseCart}>
                  <button className='border border-black rounded-[50px] w-[87px] h-[30px]'>Cart</button>
                </Link>
                <button className='border border-black rounded-[50px] w-[118px]'>Checkout</button>
                <button className='border border-black rounded-[50px] w-[135px]'>Comparison</button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
