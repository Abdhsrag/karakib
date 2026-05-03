import React, { useState, useEffect } from 'react';
import * as adminProductService from '../api/services/adminProductService';
import * as adminCategoryService from '../api/services/adminCategoryService';
import Modal from '../components/Modal';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState(null);
  const [formData, setFormData] = useState({
    subcategory_id: '',
    name: '',
    title: '',
    price: '',
    description: '',
    stock: '',
    is_active: true,
    main_image: null,
    sec_image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prods, subs] = await Promise.all([
        adminProductService.listProducts(),
        adminCategoryService.listSubcategories()
      ]);
      setProducts(prods);
      setSubcategories(subs);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProd(prod);
      setFormData({
        subcategory_id: prod.subcategory_id,
        name: prod.name,
        title: prod.title,
        price: prod.price,
        description: prod.description || '',
        stock: prod.stock,
        is_active: prod.is_active === 1 || prod.is_active === true,
        main_image: null,
        sec_image: null
      });
    } else {
      setEditingProd(null);
      setFormData({
        subcategory_id: subcategories[0]?.id || '',
        name: '',
        title: '',
        price: '',
        description: '',
        stock: '0',
        is_active: true,
        main_image: null,
        sec_image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProd(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProd) {
        await adminProductService.updateProduct(editingProd.id, {
          subcategory_id: parseInt(formData.subcategory_id),
          name: formData.name,
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          stock: parseInt(formData.stock),
          is_active: formData.is_active
        });
      } else {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null) {
            data.append(key, formData[key]);
          }
        });
        await adminProductService.createProduct(data);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      alert('Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminProductService.deleteProduct(id);
        fetchData();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-200 rounded-xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Product Catalog</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
        >
          <i className="bi-plus-lg"></i> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Subcategory</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.main_img_url} alt={prod.name} className="h-10 w-10 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <p className="font-semibold text-slate-900">{prod.name}</p>
                        <p className="text-xs text-slate-500 truncate w-48">{prod.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{prod.subcategory_title}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">${prod.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${prod.stock < 10 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>{prod.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${prod.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {prod.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(prod)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg"><i className="bi-pencil"></i></button>
                      <button onClick={() => handleDelete(prod.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><i className="bi-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProd ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Subcategory</label>
              <select
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.subcategory_id}
                onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
              >
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name} ({sub.category_title})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            {!editingProd && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Main Image</label>
                  <input
                    type="file"
                    required
                    className="w-full text-xs text-slate-500"
                    onChange={(e) => setFormData({ ...formData, main_image: e.target.files[0] })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Secondary Image</label>
                  <input
                    type="file"
                    className="w-full text-xs text-slate-500"
                    onChange={(e) => setFormData({ ...formData, sec_image: e.target.files[0] })}
                  />
                </div>
              </>
            )}
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-slate-700">Active Product</label>
            </div>
          </div>
          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white">
            <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageProducts;
