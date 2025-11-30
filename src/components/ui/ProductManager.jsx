import  { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.escuelajs.co/api/v1';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: 'Yangi Mahsulot',
    price: 99,
    description: 'Test uchun mahsulot',
    categoryId: 1,
    images: ['https://placeimg.com/640/480/any']
  });

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await axios.get('/products');
      const userRes = await axios.get('/users');
      setProducts(productRes.data);
      setUsers(userRes.data);
    };
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      const res = await axios.post('/products', newProduct);
      setProducts(prev => [res.data, ...prev]);
    } catch (err) {
      console.error('POST xatolik:', err);
    }
  };

  return (
    <div>
      <h2>📦 Mahsulotlar</h2>
      <button style={{cursor: 'pointer'}} onClick={handleAddProduct}>Yangi Mahsulot Qoshish</button>
      <ul>
        {products.slice(0, 10).map(p => (
          <li key={p.id}>{p.title} - ${p.price}</li>
        ))}
      </ul>

      <h2>👤 Foydalanuvchilar</h2>
      <ul>
        {users.slice(0, 5).map(u => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
};


export default ProductManager;