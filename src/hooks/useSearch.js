import { useState, useEffect, useCallback } from 'react';
import { searchProducts } from '../api/services/productService';
import { adaptProducts } from '../adapters/productAdapter';

export const useSearch = (query) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearch = useCallback(async () => {
    if (!query?.trim()) {
      setProducts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await searchProducts(query);
      const adaptedData = adaptProducts(data);
      setProducts(adaptedData);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return { products, loading, error, refetch: fetchSearch };
};
