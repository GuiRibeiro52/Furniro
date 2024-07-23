import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto py-10 font-poppins flex flex-col justify-center'>
        <div className="flex items-center justify-center gap-[130px] text-2xl mb-9">
            <h3 className="font-medium">Description</h3>
            <h3 className="font-normal text-secondary">Additional Information</h3>
        </div>
        <div className='text-base text-secondary'>
            <p className='mb-8 '>{product.description}</p>
            <p className='mb-9'>{product.additionalinfo}</p>
        </div>
        <div className='flex items-center justify-center gap-[29px]'>
            <img src={`/${product.image}`} alt={product.title} />
            <img src={`/${product.image}`} alt={product.title} />
        </div>
    </div>
  );
}

export default Detail;
