import OurProducts from "../components/OurProducts"
import mosaico from '../assets/mosaico.png'
import background from "../assets/background 1.png"
import Dining from '../assets/Dining.png'
import bedroom from '../assets/bedroom.png'
import Living from '../assets/Living.png'
import { Link } from "react-router-dom"
import Carousel from "../components/Carousel"

const Home = () => {
  return (
    <div className="font-poppins">
      <div className="relative mb-14">
        <img src={background} alt="room" className="w-full h-[1000px]"/>
        <div className="absolute top-[25%] right-14 w-[643px] h-[443px] bg-[#fff3e3] px-10 py-14 rounded-xl">
          <h3 className="font-semibold text-headers">New Arrival</h3>
          <h2 className="font-bold text-[52px] text-button max-w-[400px]">Discrover Our New Collection</h2>
          <p className="font-medium text-lg mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <button className="w-[222px] h-[74px] bg-button text-white"><Link to='/shop'>BUY NOW</Link></button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-16">
          <h2 className="text-headers font-bold text-[32px]">Browse The Range</h2>
          <p className="text-paragraph text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="flex items-center justify-center gap-5 mb-14">
        <div className="flex flex-col items-center">
          <img src={Dining} alt="Dining" className="mb-8" />
          <h3 className="font-semibold text-2xl text-headers">Dining</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={Living} alt="Living" className="mb-8"/>
          <h3 className="font-semibold text-2xl text-headers">Living</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={bedroom} alt="Bedroom" className="mb-8"/>
          <h3 className="font-semibold text-2xl text-headers">Bedroom</h3>
        </div>
      </div>

      <OurProducts />

      <Carousel />     

      <div className="flex flex-col items-center ">
        <h3 className="text-[#616161] font-semibold text-xl">Share your setup with</h3>
        <h2 className="text-focused font-bold text-[40px]">#FurniroFurniture</h2>
      </div>
      <img src={mosaico} alt="mosaico" className="container mx-auto mb-10" />
    </div>
  )
}

export default Home