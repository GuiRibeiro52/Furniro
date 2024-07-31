import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelatedDetails = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(4);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        const filteredProducts = response.data.filter(product => product.category === category);
        setRelatedProducts(filteredProducts);
        setVisibleProducts(filteredProducts.slice(0, productsToShow));
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();    
  }, [category, productsToShow]);

  const loadMoreProducts = () => {
    setProductsToShow(productsToShow + 4);
  };

  return (
    <div className="container mx-auto py-10 font-poppins">
      <h2 className="text-3xl font-bold mb-8 text-center">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleProducts.map(product => (
          <div key={product.id} className="w-[285px] h-[446px] bg-quartiary relative group">
            <img src={`${product.image}`} alt={product.title} className="w-full h-[301px] object-cover mb-4" />
            <h3 className="text-2xl font-semibold ml-4 mt-4 mb-2">{product.title}</h3>
            <p className="text-base text-tertiary ml-4 mb-2">{product.text}</p>
            <p className="font-semibold text-xl ml-4">R$ {product.price}</p>
            <div className="absolute inset-0 bg-focused bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/product/${product.id}`} className="w-[202px] h-[48px] bg-white text-center flex items-center justify-center text-base font-semibold text-button mb-6">View</Link>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts.length < relatedProducts.length && (
        <div className='flex items-center justify-center'>
            <button 
            onClick={loadMoreProducts} 
            className="mt-11 w-[245px] h-[48px] text-button mb-16 border-button border font-semibold"
            >
            Show More
            </button>
        </div>
        
      )}
    </div>
  );
};

export default RelatedDetails;
