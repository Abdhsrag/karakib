import React, { useState, useEffect } from 'react';
import * as adminCategoryService from '../api/services/adminCategoryService';
import Modal from '../components/Modal';

const ManageSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [formData, setFormData] = useState({ category_id: '', name: '', title: '', image: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subs, cats] = await Promise.all([
        adminCategoryService.listSubcategories(),
        adminCategoryService.listCategories()
      ]);
      setSubcategories(subs);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to fetch subcategories', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (sub = null) => {
    if (sub) {
      setEditingSub(sub);
      setFormData({ category_id: sub.category_id, name: sub.name, title: sub.title, image: null });
    } else {
      setEditingSub(null);
      setFormData({ category_id: categories[0]?.id || '', name: '', title: '', image: null });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSub(null);
    setFormData({ category_id: '', name: '', title: '', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingSub) {
        await adminCategoryService.updateSubcategory(editingSub.id, {
          category_id: parseInt(formData.category_id),
          name: formData.name,
          title: formData.title
        });
      } else {
        const data = new FormData();
        data.append('category_id', formData.category_id);
        data.append('name', formData.name);
        data.append('title', formData.title);
        if (formData.image) data.append('image', formData.image);
        await adminCategoryService.createSubcategory(data);
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
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await adminCategoryService.deleteSubcategory(id);
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
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">الأقسام الفرعية</h2>
          <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest mt-1">Subcategory Catalog Management</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          إضافة قسم فرعي / Add Subcategory
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container text-on-background/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">الصورة / Image</th>
                <th className="px-8 py-5">الاسم / Name</th>
                <th className="px-8 py-5">القسم الرئيسي / Category</th>
                <th className="px-8 py-5">العنوان / Title</th>
                <th className="px-8 py-5 text-left">التحكم / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-background">
              {subcategories.map((sub) => (
                <tr key={sub.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden border border-surface-container shadow-sm flex-shrink-0">
                      <img src={sub.img_url} alt={sub.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-primary text-base">{sub.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/5">{sub.category_title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-on-background/60">{sub.title}</span>
                  </td>
                  <td className="px-8 py-6 text-left">
                    <div className="flex justify-start gap-2">
                      <button 
                        onClick={() => handleOpenModal(sub)} 
                        className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id)} 
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
        title={editingSub ? 'تعديل القسم الفرعي / Edit Subcategory' : 'إضافة قسم فرعي جديد / Add New Subcategory'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">القسم الرئيسي / Parent Category</label>
              <select
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">اسم القسم الفرعي / Name</label>
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
            {!editingSub && (
              <div>
                <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الصورة / Image</label>
                <input
                  type="file"
                  required
                  className="w-full text-xs text-primary/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-all"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </div>
            )}
          </div>
          <div className="pt-6 flex gap-4">
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
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ القسم الفرعي / Save Subcategory'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageSubcategories;
