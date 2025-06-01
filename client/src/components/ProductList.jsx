import { useState, useEffect } from 'react'
import axios from 'axios'
import './ProductList.css'
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Asegúrate que el puerto sea correcto
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchApi();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-container" key={product.id}>
          <div className="stock">{product.stock}x</div>
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <h1>${product.price}</h1>
          <div className="input-wrapper">
            <input type="text" defaultValue="1" className="input-quantity" />
            <button className="btn" data-id={product.id}>
              <i className="mdi mdi-cart"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;