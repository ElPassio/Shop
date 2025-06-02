import React, { useState, useEffect } from 'react'; 
import ProductCard from './ProductCard'; 
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
     
                await new Promise(resolve => setTimeout(resolve, 500));

                const res = await fetch('/api/products');

                if (res.status === 304) {
                    console.log('Products not modified (304). Using cached version if available.');
                    setLoading(false);
                    return; 
                }

                if (!res.ok) {
                    const errorText = await res.text(); 
                    throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
                }

                const data = await res.json();
                setProducts(data);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err); 
                setLoading(false); 
            }
        };

        fetchProducts();
    }, []); 

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
       
        return <div>Error: {error.message}</div>;
    }

    if (products.length === 0) {

        return <div>No products found.</div>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;