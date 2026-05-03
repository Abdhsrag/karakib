import React, { useState, useEffect } from 'react';
import * as adminOrderService from '../api/services/adminOrderService';
import Modal from '../components/Modal';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusData, setStatusData] = useState({ status: 'pending', actionTaken: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminOrderService.listOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = async (order) => {
    try {
      const details = await adminOrderService.getOrderDetails(order.id);
      setSelectedOrder(details);
      setIsDetailsModalOpen(true);
    } catch (err) {
      alert('Failed to fetch order details.');
    }
  };

  const handleOpenStatus = (order) => {
    setSelectedOrder(order);
    setStatusData({ status: order.status, actionTaken: order.action_taken || '' });
    setIsStatusModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await adminOrderService.updateOrderStatus(selectedOrder.id, statusData.status, statusData.actionTaken);
      fetchOrders();
      setIsStatusModalOpen(false);
    } catch (err) {
      alert('Update failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': return { color: 'bg-amber-100 text-amber-700', labelAr: 'قيد الانتظار', labelEn: 'Pending' };
      case 'confirmed': return { color: 'bg-blue-100 text-blue-700', labelAr: 'تم التأكيد', labelEn: 'Confirmed' };
      case 'shipped': return { color: 'bg-indigo-100 text-indigo-700', labelAr: 'تم الشحن', labelEn: 'Shipped' };
      case 'delivered': return { color: 'bg-emerald-100 text-emerald-700', labelAr: 'تم التوصيل', labelEn: 'Delivered' };
      case 'cancelled': return { color: 'bg-red-100 text-red-700', labelAr: 'ملغي', labelEn: 'Cancelled' };
      default: return { color: 'bg-slate-100 text-slate-500', labelAr: 'غير معروف', labelEn: 'Unknown' };
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
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">إدارة الطلبات</h2>
          <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest mt-1">Customer Orders Management</p>
        </div>
        <button 
          onClick={fetchOrders} 
          className="text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest border border-primary/10"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          تحديث / Refresh
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container text-on-background/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">رقم الطلب / ID</th>
                <th className="px-8 py-5">العميل / Client</th>
                <th className="px-8 py-5">الإجمالي / Total</th>
                <th className="px-8 py-5">الحالة / Status</th>
                <th className="px-8 py-5">التاريخ / Date</th>
                <th className="px-8 py-5 text-left">التحكم / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-background">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-black text-primary text-base">#{order.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-sm">{order.client_name}</span>
                        <span className="text-[10px] text-on-background/40 font-bold tracking-widest">{order.client_phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-primary text-lg">{order.total_cost} ج.م</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex flex-col items-center px-3 py-1.5 rounded-xl border ${statusInfo.color} border-current/10`}>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-0.5">{statusInfo.labelAr}</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 leading-none">{statusInfo.labelEn}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-on-background/40">{new Date(order.created_at).toLocaleDateString('ar-EG')}</span>
                    </td>
                    <td className="px-8 py-6 text-left">
                      <div className="flex justify-start gap-2">
                        <button 
                          onClick={() => handleOpenDetails(order)} 
                          className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button 
                          onClick={() => handleOpenStatus(order)} 
                          className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <span className="material-symbols-outlined text-lg">settings</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={`تفاصيل الطلب / Order Details #${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-8 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">اسم العميل / Client Name</p>
                <p className="font-black text-primary">{selectedOrder.client_name}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">رقم الهاتف / Phone</p>
                <p className="font-black text-primary">{selectedOrder.client_phone}</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 md:col-span-2">
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-1">العنوان / Address</p>
                <p className="font-black text-primary">{selectedOrder.client_address}</p>
              </div>
              {selectedOrder.notes && (
                <div className="bg-error/5 p-4 rounded-2xl border border-error/10 md:col-span-2">
                  <p className="text-[10px] font-black text-error/60 uppercase tracking-widest mb-1 text-right">ملاحظات / Notes</p>
                  <p className="text-sm font-bold text-error italic leading-relaxed text-right">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 border-b border-surface-container pb-2">المنتجات المطلوبة / Items Ordered</h4>
              <div className="space-y-4">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-surface-container/30 p-4 rounded-2xl border border-surface-container">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xs">
                        x{item.quantity}
                      </div>
                      <p className="font-bold text-primary">{item.product_name}</p>
                    </div>
                    <p className="font-black text-primary text-lg">{item.price_at_order * item.quantity} ج.م</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-on-background/40 uppercase tracking-widest">التكلفة الإجمالية / Total Cost</span>
                <span className="text-3xl font-black text-primary">{selectedOrder.total_cost} ج.م</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Modal */}
      <Modal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} title="تحديث حالة الطلب / Update Status">
        <form onSubmit={handleUpdateStatus} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">الحالة / Status</label>
            <select
              className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={statusData.status}
              onChange={(e) => setStatusData({ ...statusData, status: e.target.value })}
            >
              <option value="pending">قيد الانتظار / Pending</option>
              <option value="confirmed">تم التأكيد / Confirmed</option>
              <option value="shipped">تم الشحن / Shipped</option>
              <option value="delivered">تم التوصيل / Delivered</option>
              <option value="cancelled">ملغي / Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">ملاحظات داخلية / Internal Notes</label>
            <textarea
              className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none transition-all"
              placeholder="مثال: تم الاتصال بالعميل، جاري تجهيز الطلب..."
              value={statusData.actionTaken}
              onChange={(e) => setStatusData({ ...statusData, actionTaken: e.target.value })}
            ></textarea>
          </div>
          <div className="pt-6 flex gap-4">
            <button 
              type="button" 
              onClick={() => setIsStatusModalOpen(false)} 
              className="flex-1 px-6 py-4 border border-surface-container rounded-2xl text-primary font-black hover:bg-surface-container transition-all"
            >
              إلغاء / Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-2 px-6 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري التحديث...' : 'تحديث الحالة / Update Status'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageOrders;
