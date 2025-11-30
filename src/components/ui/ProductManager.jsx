import  { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postStatus, setPostStatus] = useState(null); 
  const [newProductData, setNewProductData] = useState({
    title: '',
    price: 0,
    description: '',
    categoryId: 1, 
    images: ['https://picsum.photos/640/480'] 
  });

  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${BASE_URL}/products?offset=0&limit=5`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Mahsulotlarni olishda xato:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prevData => ({
      ...prevData,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  
  const handlePostProduct = async (e) => {
    e.preventDefault();
    setPostStatus('sending');

    try {
      const response = await axios.post(`${BASE_URL}/products/`, newProductData);
      
      console.log(' POST Muvaffaqiyatli:', response.data);

      setPostStatus('success');
      
      
      setProducts(prevProducts => [response.data, ...prevProducts]); 

      
      setNewProductData({
        title: '',
        price: 0,
        description: '',
        categoryId: 1,
        images: ['https://picsum.photos/640/480']
      });

    } catch (error) {
      console.error(' POST Xatosi:', error.response ? error.response.data : error.message);
      setPostStatus('error');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    
      
    
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <h2>POST qilish</h2>
        <form onSubmit={handlePostProduct}>
          <label>Nomi:</label>
          <input 
            type="text" 
            name="title" 
            value={newProductData.title} 
            onChange={handleChange} 
            required
            style={{ display: 'block', width: '90%', margin: '5px 0 10px 0' }}
            className='border'
          />

          <label>Narxi:</label>
          <input 
            type="number" 
            name="price" 
            value={newProductData.price} 
            onChange={handleChange} 
            required
            style={{ display: 'block', width: '90%', margin: '5px 0 10px 0' }} 
            className='border'
          />

          <label>Description:</label>
          <textarea 
            name="description" 
            value={newProductData.description} 
            onChange={handleChange} 
            required
            style={{ display: 'block', width: '90%', margin: '5px 0 10px 0' }}
            className='border'
          />
          
          <button className='border' type="submit" disabled={postStatus === 'sending'}>
            {postStatus === 'sending' ? 'Yuborilmoqda...' : 'Mahsulot Yaratish'}
          </button>
        </form>

        {postStatus === 'success' && <p style={{ color: 'green' }}> Mahsulot muvaffaqiyatli yaratildi (ID: {products[0].id})!</p>}
        {postStatus === 'error' && <p style={{ color: 'red' }}> Xato yuz berdi. Konsolni tekshiring.</p>}
      </div>

      <hr />

     
      <h2>GET bolgan mahsulotlar</h2>
      {loading ? (
        <p>Malumotlar yuklanmoqda...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: '10px', borderBottom: '1px dotted #eee', paddingBottom: '5px' }}>
              <strong>{product.title}</strong> - ${product.price} 
              <span style={{ color: '#666', fontSize: '0.8em', marginLeft: '10px' }}> (ID: {product.id})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductManager;