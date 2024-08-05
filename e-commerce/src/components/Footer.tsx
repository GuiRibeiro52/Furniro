import React from 'react'
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };


  return (
    <footer className="bg-[rgba(255,255,255,0.17)] px-6 md:px-[25px] lg:px-[50px] xl:px-[100px] pt-12 2xl:pt-12 2xl:px-[200px] font-poppins border-t-2">
      <div className="lg:flex lg:justify-between">
        <div className="flex md:flex items-center justify-around lg:flex-col lg:items-start">
          <div className="mb-[55px]">
            <h2 className="font-bold text-2xl mb-[50px]">
              Furniro.
            </h2>
            <p className="text-secondary flex flex-col  font-normal text-base leading-6 ">
              400 University Drive Suite 200 Coral<span>Gables,</span>FL 33134 USA
            </p>
          </div>

          <div className="flex gap-4">
            <Link to={'https://facebook.com'} className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
              <BiLogoFacebook />
            </Link>
            <Link to={'https://instagram.com'} className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
              <FaInstagram />
            </Link>
            <Link to={'https://twitter.com'} className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
              <BsTwitter />
            </Link>
            <Link to={'https://linkedin.com'} className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        
        <div className="flex md:flex justify-around lg:gap-[200px]">
          <div className="text-base">
            <h3 className="mb-[55px] text-secondary">Links</h3>
            <ul className="flex flex-col gap-[46px] font-medium">
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><button onClick={() => handleNavigation('/about')} className="text-left">About</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="text-left">Contact</button></li>
            </ul>
          </div>

          <div className="text-base">
            <h3 className="mb-[55px] text-secondary">Help</h3>
            <ul className="flex flex-col gap-[46px] font-medium">
              <li><Link to={'https://google.com'}>Payment Option</Link></li>
              <li><Link to={'https://google.com'}>Return</Link></li>
              <li><Link to={'https://google.com'}>Privacy Policies</Link></li>
            </ul>
          </div>
        </div>
        

        <div className="text-base mt-10 md:mt-10 flex flex-col items-center">
          <h3 className="mb-[55px] text-secondary">Newsletter</h3>
          <div className="flex leading-5 gap-5">
            <input 
            type="text" 
            placeholder="Enter Your Email Address" 
            className="font-normal border-0 border-b-2 border-black pb-2 focus:outline-none"/>
            <button 
            type="submit" 
            className="font-medium text-sm border-0 border-b-2 border-black pb-2">SUBSCRIBE</button>
          </div>     
        </div> 
      </div>
      <div className="border-t-2 mt-12 ">
        <h2 className="mt-9 mb-9 [text-base font-normal">2023 furino. All rights reserved</h2>
      </div>

    </footer>
  )
}

export default Footer