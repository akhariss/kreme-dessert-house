import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../backend/productService';
import { products as localProducts } from '../data/products'; // Fallback buat jaga-jaga

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Fetching products from Supabase...');
      const data = await productService.getAllProducts();
      
      if (data && data.length > 0) {
        setProducts(data);
        console.log(`✅ Loaded ${data.length} products from Database`);
      } else {
        console.log('⚠️ No products in DB, using local data');
        setProducts(localProducts);
      }
    } catch (err) {
      console.error('❌ Failed to fetch products, using local fallback:', err);
      // Fallback ke data hardcoded kalo internet mati/error
      setProducts(localProducts);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      isLoading, 
      error, 
      refreshProducts: fetchProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
