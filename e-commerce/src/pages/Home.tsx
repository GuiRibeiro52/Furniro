// Home.tsx
import OurProducts from "../components/OurProducts";
import mosaico from '../assets/mosaico.png';
import background from "../assets/background 1.png";
import Dining from '../assets/Dining.png';
import bedroom from '../assets/bedroom.png';
import Living from '../assets/Living.png';
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (categories) => {
    navigate('/shop', { state: { categories } });
  };

  return (
    <div className="font-poppins">
      <div className="relative mb-14">
        <img src={background} alt="room" className="lg:w-full lg:h-auto"/>
        <div className="w-full p-6 lg:absolute lg:top-[25%] lg:right-14 lg:w-[643px] lg:h-[443px] bg-[#fff3e3] lg:px-10 lg:py-14 lg:rounded-xl">
          <h3 className="font-semibold text-headers">New Arrival</h3>
          <h2 className="font-bold text-[52px] text-button max-w-[400px]">Discover Our New Collection</h2>
          <p className="font-medium text-lg mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <button className="w-[222px] h-[74px] bg-button text-white"><Link to='/shop'>BUY NOW</Link></button>
        </div>
      </div>

      <div className="m-4 flex flex-col items-center justify-center lg:flex lg:flex-col lg:items-center lg:mb-16">
          <h2 className="text-headers font-bold text-[32px]">Browse The Range</h2>
          <p className="text-paragraph text-xl text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="mb-14 lg:flex lg:items-center lg:justify-center lg:gap-5 lg:mb-14 lg:mx-4">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate(['table', 'cabinet'])}>
          <img src={Dining} alt="Dining" className="mb-8" />
          <h3 className="font-semibold text-2xl text-headers">Dining</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate(['sofa', 'rack'])}>
          <img src={Living} alt="Living" className="mb-8"/>
          <h3 className="font-semibold text-2xl text-headers">Living</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavigate(['closet'])}>
          <img src={bedroom} alt="Bedroom" className="mb-8"/>
          <h3 className="font-semibold text-2xl text-headers">Bedroom</h3>
        </div>
      </div>

      <div className="flex justify-center">
        <OurProducts />  
      </div>

      <div>
        <Carousel /> 
      </div>      
          

      <div className="flex flex-col items-center ">
        <h3 className="text-[#616161] font-semibold text-xl">Share your setup with</h3>
        <h2 className="text-focused font-bold text-[40px]">#FurniroFurniture</h2>
      </div>
      <img src={mosaico} alt="mosaico" className="container mx-auto mb-10" />
    </div>
  );
};

export default Home;
