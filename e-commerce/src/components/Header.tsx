
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";



const Header = () => {
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
      <div className='flex gap-8 items-center'>
        <FaRegUser size={24} />
        <AiOutlineShoppingCart size={28}/>
      </div>
    </header>
  )
}

export default Header