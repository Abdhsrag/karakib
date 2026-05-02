export const adaptSubcategory = (sub) => {
  return {
    id: sub.id,
    title: sub.title || sub.name || '',
    image: sub.img_url || sub.image || 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=450&fit=crop&q=80',
    original: sub // keep original just in case
  };
};

export const adaptSubcategories = (data) => {
  const items = data?.data || data || [];
  return Array.isArray(items) ? items.map(adaptSubcategory) : [];
};

export const adaptCategory = (cat) => {
  return {
    id: cat.id,
    title: cat.title || cat.name || '',
    image: cat.img_url || cat.image || '',
    original: cat
  };
};

export const adaptCategories = (data) => {
  const items = data?.data || data || [];
  return Array.isArray(items) ? items.map(adaptCategory) : [];
};
