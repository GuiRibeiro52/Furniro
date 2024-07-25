import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SubHeader from './SubHeader';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { AiFillTwitterCircle } from "react-icons/ai";

const Detail = ({ updateCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.image);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    updateCart(quantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SubHeader product={product} />
      <div className='container flex mx-auto font-poppins justify-center mt-[35px]'>
        <div className='flex justify-center gap-[29px] mr-[82px]'>
          <div className="flex flex-col space-y-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`${product.title} ${index}`}
                className="cursor-pointer w-[76px] h-[80px] rounded-[10px]"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <img src={`/${selectedImage}`} alt={product.title} className='w-[481px] h-[500px] rounded-[10px]'/>
        </div>
        <div>
          <h2 className="text-[42px] font-normal">{product.title}</h2>
          <p className="text-2xl font-medium text-secondary mb-[15px]">R$ {product.price.toFixed(2)}</p>
          <div className="flex items-center space-x-1 mt-2">
            {[...Array(Math.floor(product.reviews))].map((_, i) => (
              <BsStarFill key={i} className="text-yellow-500" />
            ))}
            {product.reviews % 1 !== 0 && <BsStarHalf className="text-yellow-500" />}
            {[...Array(5 - Math.ceil(product.reviews))].map((_, i) => (
              <BsStar key={i} className="text-yellow-500" />
            ))}            
          </div>
          <div className="mt-6">
            <p className='w-[424px] text-[13px] font-normal mb-[22px]'>{product.description}</p>
            <span className="font-normal text-secondary text-[14px]">Size: </span>
            <div className="flex space-x-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={` w-[30px] h-[30px] flex items-center justify-center rounded text-[13px] bg-subheader ${selectedSize === size ? ' bg-[#b88e2f] text-white' : 'border-gray-300'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <span className="font-normal text-secondary text-[14px]">Color: </span>
            <div className="flex space-x-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-2 border-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className='flex mt-6 gap-[18px] mb-[60px]'>
            <div className="flex items-center justify-center space-x-3 border border-secondary w-[123px] h-[64px] rounded-[10px]">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-3 py-2"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 "
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 w-[215px] h-[64px] rounded-[15px] border border-black font-normal text-xl"
            >
              Add To Cart
            </button>
          </div>
          <div className="border-t flex flex-col gap-[12px] text-base mb-[67px]">
            <p className='mt-[41px] text-secondary'>SKU: {product.sku}</p>
            <p className='text-secondary'>Category: {product.category}</p>
            <p className='text-secondary'>Tags: {product.tags.join(', ')}</p>
            <div className="flex items-center space-x-4">
              <p className='text-secondary'>Share:</p>
              <FaFacebook className="cursor-pointer" size={24}/>
              <FaLinkedin className="cursor-pointer" size={24}/>
              <AiFillTwitterCircle className="cursor-pointer" size={28} />
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto py-10 font-poppins flex flex-col justify-center border-t'>
        <div className="flex items-center justify-center gap-[130px] text-2xl mb-9">
          <h3 className="font-medium">Description</h3>
          <h3 className="font-normal text-secondary">Additional Information</h3>
        </div>
        <div className='text-base text-secondary'>
          <p className='mb-8'>{product.description}</p>
          <p className='mb-9'>{product.additionalinfo}</p>
        </div>
        <div className='flex items-center justify-center gap-[29px]'>
          <img src={`/${product.image}`} alt={product.title} />
          <img src={`/${product.image}`} alt={product.title} />
        </div>
      </div>
    </div>
  );
}

export default Detail;
