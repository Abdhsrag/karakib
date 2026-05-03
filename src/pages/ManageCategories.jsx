import React, { useState, useEffect } from 'react';
import * as adminCategoryService from '../api/services/adminCategoryService';
import Modal from '../components/Modal';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', title: '', image: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await adminCategoryService.listCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, title: category.title, image: null });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', title: '', image: null });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', title: '', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        // Update
        await adminCategoryService.updateCategory(editingCategory.id, {
          name: formData.name,
          title: formData.title
        });
      } else {
        // Create
        const data = new FormData();
        data.append('name', formData.name);
        data.append('title', formData.title);
        if (formData.image) data.append('image', formData.image);
        await adminCategoryService.createCategory(data);
      }
      fetchCategories();
      handleCloseModal();
    } catch (err) {
      alert('Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await adminCategoryService.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  if (loading) return <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-200 rounded-xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Store Categories</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2"
        >
          <i className="bi-plus-lg"></i> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <img src={cat.img_url} alt={cat.name} className="h-12 w-12 rounded-lg object-cover border border-slate-200 group-hover:scale-110 transition-transform" />
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">{cat.name}</td>
                <td className="px-6 py-4">{cat.title}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(cat.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(cat)}
                      className="p-2 hover:bg-cyan-50 text-cyan-600 rounded-lg transition-colors"
                    >
                      <i className="bi-pencil"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <i className="bi-trash"></i>
                    </button>
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
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          {!editingCategory && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
              <input
                type="file"
                required
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 transition-all"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>
          )}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCategories;
