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

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-200 rounded-xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Store Subcategories</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
        >
          <i className="bi-plus-lg"></i> Add Subcategory
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {subcategories.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <img src={sub.img_url} alt={sub.name} className="h-12 w-12 rounded-lg object-cover border border-slate-200" />
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">{sub.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold uppercase">
                    {sub.category_title}
                  </span>
                </td>
                <td className="px-6 py-4">{sub.title}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(sub)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg"><i className="bi-pencil"></i></button>
                    <button onClick={() => handleDelete(sub.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><i className="bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingSub ? 'Edit Subcategory' : 'Add New Subcategory'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Category</label>
            <select
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          {!editingSub && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
              <input
                type="file"
                required
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>
          )}
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Subcategory'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageSubcategories;
