import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../api/services/categoryService';
import { adaptCategories } from '../adapters/categoryAdapter';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      const adaptedData = adaptCategories(data);
      setCategories(adaptedData);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'حدث خطأ أثناء جلب الأقسام');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};
