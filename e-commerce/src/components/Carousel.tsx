import { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      category: "Bed Room",
      title: "Inner Peace",
      image: "https://furniro001.s3.us-east-2.amazonaws.com/images/Mobly-Guarda-Roupa-Casal-com-Espelho-Paris-3-PT-2-GV-Naturale-4655-3919401-1.jpg",
      link: "/product/27"
    },
    {
      id: 2,
      category: "Living Room",
      title: "Modern Style",
      image: "https://furniro001.s3.us-east-2.amazonaws.com/images/Mobly-SofC3A1-3-Lugares-RetrC3A1til-e-ReclinC3A1vel-Lupin-Linho-Cru-4214-5391811-2.jpg",
      link: "/product/32"
    },
    {
      id: 3,
      category: "Office",
      title: "Professional Look",
      image: "https://furniro001.s3.us-east-2.amazonaws.com/images/Mobly-Mesa-de-EscritC3B3rio-em-L-Nero-Branco-0408-661122-2.jpg",
      link: "/product/29"
    },
    {
      id: 4,
      category: "Dining Room",
      title: "Cozy Meal",
      image: "https://furniro001.s3.us-east-2.amazonaws.com/images/Madesa-ArmC3A1rio-de-Cozinha-Completa-Madesa-Emilly-Box-com-BalcC3A3o-e-AC3A9reo-Vidro---Rustic2FPreto-9860-211339-1.jpg",
      link: "/product/20"
    },
  ];

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0px',
    beforeChange: (current, next) => setCenterSlideIndex(next),
  };

  const [centerSlideIndex, setCenterSlideIndex] = useState(0);

  return (
    <div className="relative container mx-auto py-10 flex flex-col md:flex-row font-poppins">
      <div className="md:w-1/3 p-8">
        <h2 className="text-3xl font-bold mb-4">50+ Beautiful rooms inspiration</h2>
        <p className="text-lg mb-4">Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
        <button className="px-6 py-3 bg-button text-white rounded-md">Explore More</button>
      </div>
      <div className="md:w-2/3">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id} className={`transform transition-transform duration-1000 ${index === centerSlideIndex ? 'scale-102 ease-in' : 'scale-90 ease-out'}`}>
              <Link to={slide.link}>
                <div className="relative">
                  <img src={slide.image} alt={slide.title} className={`object-cover w-full ${index === centerSlideIndex ? 'h-[582px] w-404px' : 'h-[486px] w-[372px]'}`} />
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-2 rounded">
                    <h3 className="text-xl font-semibold">{slide.category}</h3>
                    <p className="text-lg">{slide.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
