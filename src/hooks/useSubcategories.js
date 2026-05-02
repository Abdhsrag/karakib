import { useState, useEffect, useCallback } from 'react';
import { getSubcategories } from '../api/services/categoryService';
import { adaptSubcategories } from '../adapters/categoryAdapter';

export const useSubcategories = (categoryId) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubcategories = useCallback(async () => {
    if (!categoryId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getSubcategories(categoryId);
      const adaptedData = adaptSubcategories(data);
      setSubcategories(adaptedData);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      setError(err.message || 'حدث خطأ أثناء جلب الأقسام الفرعية');
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  return { subcategories, loading, error, refetch: fetchSubcategories };
};
