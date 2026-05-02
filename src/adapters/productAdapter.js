export const adaptProduct = (product) => {
  return {
    id: product.id,
    title: product.title || product.name || '',
    image: product.main_img_url || product.image || product.img_url || '',
    sec_image: product.sec_img_url || '',
    description: product.description || product.desc || '',
    price: product.price || 0,
    original: product
  };
};

export const adaptProducts = (data) => {
  const items = data?.data || data || [];
  return Array.isArray(items) ? items.map(adaptProduct) : [];
};
