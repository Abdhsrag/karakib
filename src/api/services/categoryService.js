import apiClient from '../apiClient';

let categoriesCache = null;
let categoriesPromise = null;

export const getCategories = async () => {
  if (categoriesCache) return categoriesCache;
  if (categoriesPromise) return categoriesPromise;

  categoriesPromise = (async () => {
    try {
      const response = await apiClient.get('/user/categories');
      categoriesCache = response.data;
      return categoriesCache;
    } catch (error) {
      categoriesPromise = null;
      throw error;
    }
  })();

  return categoriesPromise;
};

const subcategoriesCache = new Map();
const subcategoriesPromises = new Map();

export const getSubcategories = async (categoryId) => {
  if (subcategoriesCache.has(categoryId)) return subcategoriesCache.get(categoryId);
  if (subcategoriesPromises.has(categoryId)) return subcategoriesPromises.get(categoryId);

  const promise = (async () => {
    try {
      const response = await apiClient.get(`/user/categories/${categoryId}/subcategories`);
      subcategoriesCache.set(categoryId, response.data);
      return response.data;
    } catch (error) {
      subcategoriesPromises.delete(categoryId);
      throw error;
    }
  })();

  subcategoriesPromises.set(categoryId, promise);
  return promise;
};
