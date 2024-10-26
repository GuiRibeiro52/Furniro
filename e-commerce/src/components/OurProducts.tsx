import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import share from '../assets/share.png';
import compare from '../assets/compare.png';
import Heart from '../assets/Heart.png';

interface Product {
  id: number;
  image: string;
  title: string;
  text: string;
  price: number;
}

const OurProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const productsToShow = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/dbreskovit/json-api-products-w12/refs/heads/main/_database.json');
        const adaptedProducts = response.data.products.map((product: {
          id: number,
          images: { mainImage: string },
          title: string,
          description: { short: string },
          salePrice: number
        }) => ({
          id: product.id,
          image: product.images.mainImage,
          title: product.title,
          text: product.description.short,
          price: product.salePrice
        }));
        setProducts(shuffleArray(adaptedProducts));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setVisibleProducts(products.slice(0, productsToShow));
  }, [products, productsToShow]);

  const shuffleArray = (array: Product[]): Product[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="font-poppins container flex flex-col items-center sm:flex sm:flex-col sm:items-center md:px-6 lg:py-10 lg:px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map(product => (
          <div key={product.id} className="relative group w-[285px] h-[500px] bg-quartiary">
            <img src={product.image} alt={product.title} className="w-full h-[200px] object-cover mb-4" />
            <h3 className="text-lg font-semibold ml-4 mt-4 mb-2">{product.title}</h3>
            <p className="text-sm text-tertiary ml-4 mb-2">{product.text}</p>
            <p className="font-semibold text-xl ml-4">R$ {product.price.toFixed(2)}</p>

            <div className="absolute inset-0 bg-focused bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/product/${product.id}`} className="w-[202px] h-[48px] bg-white text-center flex items-center justify-center text-base font-semibold text-button mb-6">View</Link>
              <div className="flex space-x-4 text-white">
                <button className="focus:outline-none flex items-center gap-1"><img src={share} alt="share" />Share</button>
                <button className="focus:outline-none flex items-center gap-1"><img src={compare} alt="compare" />Compare</button>
                <button className="focus:outline-none flex items-center gap-1"><img src={Heart} alt="Like" />Like</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts.length < products.length && (
        <div className='flex items-center justify-center'>
          <Link to='/shop'>
            <button className='w-[245px] h-[48px] text-button mt-8 mb-16 border-button border font-semibold'>Show More</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OurProducts;
