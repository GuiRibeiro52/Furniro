import { useState, useEffect } from 'react';
import axios from 'axios';
import BannerBot from "../components/BannerBot";
import BannerTop from "../components/BannerTop";
import { Link } from 'react-router-dom';
import share from '../assets/share.png';
import compare from '../assets/compare.png';
import Heart from '../assets/Heart.png'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const productsPerPage = 16; // 4 fileiras com 4 produtos cada

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <BannerTop pageName="Shop"/>
      <div className="container mx-auto py-10 font-poppins">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {getPaginatedProducts().map(product => (
            <div key={product.id} className="w-[285px] h-[446px] bg-quartiary relative group">
              <img src={`/${product.image}`} alt={product.title} className="w-full h-[301px] object-cover mb-4" />
              <h3 className="text-2xl font-semibold ml-4 mt-4 mb-2">{product.title}</h3>
              <p className="text-base text-tertiary ml-4 mb-2">{product.text}</p>
              <p className="font-semibold text-xl ml-4">R$ {product.price}</p>

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
        <div className="flex justify-center mt-10 gap-[38px]">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 w-[60px] h-[60px] rounded-[10px] ${currentPage === index + 1 ? 'bg-button text-white' : 'bg-subheader'}`}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 px-3 py-2 w-[100px] h-[60px] rounded-[10px] bg-subheader"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <BannerBot />
    </div>
  );
}

export default Shop;
