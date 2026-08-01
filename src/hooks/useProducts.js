import { useState, useEffect, useCallback } from 'react';
import { getProducts, getRandomProductsFromCategories } from '../api/services/productService';
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
      setError(err.parsedMessage || 'Error fetching products');
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

export const useRandomCategoryProducts = (count = 4) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rawProducts = await getRandomProductsFromCategories(count);
      const adaptedData = adaptProducts(rawProducts);
      setProducts(adaptedData);
    } catch (err) {
      console.error('Error fetching random category products:', err);
      setError(err.parsedMessage || 'حدث خطأ أثناء جلب المنتجات');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchRandomProducts();
  }, [fetchRandomProducts]);

  return { products, loading, error, refetch: fetchRandomProducts };
};
