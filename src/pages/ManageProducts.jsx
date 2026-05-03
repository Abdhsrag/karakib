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

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-primary/5 rounded-2xl w-1/4"></div>
      <div className="h-96 bg-primary/5 rounded-[2rem]"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">إدارة المنتجات</h2>
          <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest mt-1">Product Catalog Management</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          إضافة منتج / Add Product
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container text-on-background/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">المنتج / Product</th>
                <th className="px-8 py-5">القسم / Subcategory</th>
                <th className="px-8 py-5">السعر / Price</th>
                <th className="px-8 py-5">المخزون / Stock</th>
                <th className="px-8 py-5">الحالة / Status</th>
                <th className="px-8 py-5 text-left">التحكم / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-background">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden border border-surface-container shadow-sm flex-shrink-0">
                        <img src={prod.main_img_url} alt={prod.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-base">{prod.name}</span>
                        <span className="text-[10px] text-on-background/40 font-medium truncate w-48">{prod.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/5">{prod.subcategory_title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-primary text-lg">{prod.price} ج.م</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-black ${prod.stock < 10 ? 'text-error' : 'text-primary/60'}`}>{prod.stock}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${prod.is_active ? 'bg-primary' : 'bg-on-background/20'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${prod.is_active ? 'text-primary' : 'text-on-background/30'}`}>
                         {prod.is_active ? 'Active' : 'Inactive'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-left">
                    <div className="flex justify-start gap-2">
                      <button 
                        onClick={() => handleOpenModal(prod)} 
                        className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(prod.id)} 
                        className="w-10 h-10 rounded-xl bg-error/5 text-error hover:bg-error hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
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
        title={editingProd ? 'تعديل المنتج / Edit Product' : 'إضافة منتج جديد / Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">القسم الفرعي / Subcategory</label>
              <select
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.subcategory_id}
                onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
              >
                {subcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name} ({sub.category_title})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">اسم المنتج / Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">العنوان / Title</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">السعر / Price (EGP)</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">المخزون / Stock</label>
              <input
                type="number"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الوصف / Description</label>
              <textarea
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none transition-all"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            {!editingProd && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الصورة الرئيسية / Main Image</label>
                  <div className="relative group">
                    <input
                      type="file"
                      required
                      className="w-full text-xs text-primary/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-all"
                      onChange={(e) => setFormData({ ...formData, main_image: e.target.files[0] })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الصورة الثانية / Secondary Image</label>
                  <input
                    type="file"
                    className="w-full text-xs text-primary/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-all"
                    onChange={(e) => setFormData({ ...formData, sec_image: e.target.files[0] })}
                  />
                </div>
              </>
            )}
            <div className="md:col-span-2 flex items-center gap-3 bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
              />
              <label htmlFor="is_active" className="text-sm font-black text-primary cursor-pointer select-none">منتج مفعل / Active Product</label>
            </div>
          </div>
          <div className="pt-6 flex gap-4 sticky bottom-0 bg-white">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className="flex-1 px-6 py-4 border border-surface-container rounded-2xl text-primary font-black hover:bg-surface-container transition-all"
            >
              إلغاء / Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-2 px-6 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ المنتج / Save Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageProducts;
