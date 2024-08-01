import bannerTop from '../assets/BannerTop.png';
import HouseLogos from '../assets/HouseLogos.png'

const BannerTop = ({pageName}) => {
  return (
    <div className="relative w-full font-poppins">
      <img src={bannerTop} alt="Banner Top" className="w-full h-[175px] md:h-auto object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
        <img src={HouseLogos} alt="House logos" />
        <div className='flex flex-col items-center gap-5'>
          <h1  className='text-5xl font-medium'>{pageName}</h1>
          <p className='text-base font-medium'>Home &gt; <span className='font-light'>{pageName}</span></p>
        </div>
      </div>
    </div>
  );
}

export default BannerTop;
