import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/services/productService';
import { adaptProducts } from '../adapters/productAdapter';

export const useProducts = (subcategoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    if (!subcategoryId) {
      setProducts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(subcategoryId);
      const adaptedData = adaptProducts(data);
      setProducts(adaptedData);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Error fetching products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [subcategoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};
