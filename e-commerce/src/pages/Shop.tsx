import { useState, useEffect } from 'react';
import axios from 'axios';
import BannerBot from "../components/BannerBot";
import BannerTop from "../components/BannerTop";
import { Link } from 'react-router-dom';
import share from '../assets/share.png';
import compare from '../assets/compare.png';
import Heart from '../assets/Heart.png';
import Filter from '../components/Filter';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [itemsPerPage]);

  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (sortOption === 'A to Z') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'Z to A') {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, itemsPerPage]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category.includes(category)));
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div>
      <BannerTop pageName="Shop" />
      <Filter 
        onFilterChange={handleFilterChange} 
        onItemsPerPageChange={handleItemsPerPageChange}
        onSortChange={handleSortChange}
        totalResults={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />
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
        <div className="flex justify-center mt-11 mb-11 gap-[38px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-2 w-[100px] h-[60px] rounded-[10px] ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-subheader'}`}
          >
            Prev
          </button>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 w-[60px] h-[60px] rounded-[10px] ${currentPage === index + 1 ? 'bg-button text-white' : 'bg-subheader'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
            className={`mx-1 px-3 py-2 w-[100px] h-[60px] rounded-[10px] ${currentPage >= Math.ceil(filteredProducts.length / itemsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-subheader'}`}
          >
            Next
          </button>
        </div>
      </div>
      <BannerBot />
    </div>
  );
}

export default Shop;
