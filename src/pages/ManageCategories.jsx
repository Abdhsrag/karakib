import { useState, useEffect } from 'react';
import * as adminCategoryService from '../api/services/adminCategoryService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { useConfirm } from '../components/ConfirmDialog';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', title: '', image: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToast();
  const confirm = useConfirm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await adminCategoryService.listCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
      showToast(err.parsedMessage || 'Failed to fetch categories', 'error');
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
        await adminCategoryService.updateCategory(editingCategory.id, {
          name: formData.name,
          title: formData.title
        });
        if (formData.image) {
          await adminCategoryService.updateCategoryImage(editingCategory.id, formData.image);
        }
      } else {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('title', formData.title);
        if (formData.image) data.append('image', formData.image);
        await adminCategoryService.createCategory(data);
      }
      fetchCategories();
      handleCloseModal();
    } catch (err) {
      console.error('Category creation error:', err);
      showToast(err.parsedMessage || 'Operation failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: 'حذف القسم / Delete Category',
      message: 'هل أنت متأكد من حذف هذا القسم؟ / Are you sure you want to delete this category?',
      confirmText: 'حذف / Delete',
      cancelText: 'إلغاء / Cancel',
    });
    if (!confirmed) return;
    try {
      await adminCategoryService.deleteCategory(id);
      fetchCategories();
      showToast('تم الحذف بنجاح / Deleted successfully', 'success');
    } catch (err) {
      showToast(err.parsedMessage || 'Delete failed.', 'error');
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
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">أقسام المتجر</h2>
          <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest mt-1">Store Category Management</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          إضافة قسم / Add Category
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container text-on-background/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">الصورة / Image</th>
                <th className="px-8 py-5">الاسم / Name</th>
                <th className="px-8 py-5">العنوان / Title</th>
                <th className="px-8 py-5">تاريخ الإضافة / Created At</th>
                <th className="px-8 py-5 text-left">التحكم / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-background">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden border border-surface-container shadow-sm flex-shrink-0">
                      <img src={cat.img_url} alt={cat.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-primary text-base">{cat.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-on-background/60">{cat.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-on-background/40">{new Date(cat.created_at).toLocaleDateString('ar-EG')}</span>
                  </td>
                  <td className="px-8 py-6 text-left">
                    <div className="flex justify-start gap-2">
                      <button 
                        onClick={() => handleOpenModal(cat)} 
                        className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)} 
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
        title={editingCategory ? 'تعديل القسم / Edit Category' : 'إضافة قسم جديد / Add New Category'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-grow overflow-hidden">
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-grow min-h-0 custom-scrollbar">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">اسم القسم / Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-3.5 bg-white border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">العنوان / Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-3.5 bg-white border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الصورة / Image</label>
                {editingCategory && editingCategory.img_url && (
                  <div className="mb-3 flex items-center gap-4 bg-primary/5 p-3 rounded-2xl border border-surface-container">
                    <img src={editingCategory.img_url} alt="Current Category" className="h-16 w-16 object-cover rounded-xl border border-surface-container" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">الصورة الحالية / Current Image</span>
                      <span className="text-xs text-primary/60 font-bold truncate max-w-[200px]">{editingCategory.img_url.split('/').pop()}</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  required={!editingCategory}
                  className="w-full text-xs text-primary/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-all"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
                {editingCategory && (
                  <span className="text-[10px] text-primary/40 block mt-1 font-bold">اتركه فارغاً للحفاظ على الصورة الحالية / Leave empty to keep current image</span>
                )}
              </div>
            </div>
          </div>
          <div className="p-5 md:p-6 border-t border-surface-container flex flex-col-reverse sm:flex-row gap-3 bg-white flex-shrink-0">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className="flex-1 px-6 py-3.5 border border-surface-container rounded-2xl text-primary font-black hover:bg-surface-container transition-all text-sm md:text-base"
            >
              إلغاء / Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 sm:flex-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-sm md:text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ القسم / Save Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCategories;