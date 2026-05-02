import apiClient from '../apiClient';

const productsCache = new Map();
const productsPromises = new Map();

export const getProducts = async (subcategoryId) => {
  if (productsCache.has(subcategoryId)) return productsCache.get(subcategoryId);
  if (productsPromises.has(subcategoryId)) return productsPromises.get(subcategoryId);

  const promise = (async () => {
    try {
      const response = await apiClient.get(`/user/subcategories/${subcategoryId}/products`);
      productsCache.set(subcategoryId, response.data);
      return response.data;
    } catch (error) {
      productsPromises.delete(subcategoryId);
      throw error;
    }
  })();

  productsPromises.set(subcategoryId, promise);
  return promise;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/user/products/${productId}`);
  return response.data;
};

let allProductsCache = null;
let catalogFetchPromise = null;

const fetchEntireCatalog = async () => {
  if (allProductsCache) return allProductsCache;
  if (catalogFetchPromise) return catalogFetchPromise;

  catalogFetchPromise = (async () => {
    try {
      // Step 1: get all main categories
      const catRes = await apiClient.get('/user/categories');
      const categories = catRes.data.data || catRes.data || [];

      // Step 2: get subcategories for each category
      const subPromises = categories.map(cat =>
        apiClient.get(`/user/categories/${cat.id}/subcategories`).then(r => r.data.data || r.data || []).catch(() => [])
      );
      const subArrays = await Promise.all(subPromises);
      const allSubs = subArrays.flat();

      // Step 3: get products for each subcategory
      const prodPromises = allSubs.map(sub =>
        apiClient.get(`/user/subcategories/${sub.id}/products`).then(r => r.data.data || r.data || []).catch(() => [])
      );
      const prodArrays = await Promise.all(prodPromises);
      const rawProducts = prodArrays.flat();

      // Deduplicate by ID
      const seen = new Set();
      allProductsCache = rawProducts.filter(p => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });

      return allProductsCache;
    } catch (error) {
      catalogFetchPromise = null; // Reset on error so it can retry later
      throw error;
    }
  })();

  return catalogFetchPromise;
};

export const searchProducts = async (query) => {
  const allProducts = await fetchEntireCatalog();

  // Step 4: filter locally by title / name / description
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(p => {
    const title = (p.title || p.name || '').toLowerCase();
    const desc = (p.description || p.desc || '').toLowerCase();
    return title.includes(lowerQuery) || desc.includes(lowerQuery);
  });
};
