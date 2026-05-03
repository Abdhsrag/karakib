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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-indigo-100 text-indigo-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-200 rounded-xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Orders</h2>
        <button onClick={fetchOrders} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"><i className="bi-arrow-clockwise"></i> Refresh</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">#{order.id}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold">{order.client_name}</p>
                  <p className="text-xs text-slate-500">{order.client_phone}</p>
                </td>
                <td className="px-6 py-4 font-bold">${order.total_cost}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenDetails(order)} className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg"><i className="bi-eye"></i></button>
                    <button onClick={() => handleOpenStatus(order)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><i className="bi-gear"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={`Order Details #${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-slate-500 mb-1">Client Name</p>
                <p className="font-bold text-slate-900">{selectedOrder.client_name}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-slate-500 mb-1">Phone</p>
                <p className="font-bold text-slate-900">{selectedOrder.client_phone}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg col-span-2">
                <p className="text-slate-500 mb-1">Address</p>
                <p className="font-bold text-slate-900">{selectedOrder.client_address}</p>
              </div>
              {selectedOrder.notes && (
                <div className="bg-amber-50 p-3 rounded-lg col-span-2 border border-amber-100">
                  <p className="text-amber-700 font-semibold mb-1">Notes</p>
                  <p className="text-amber-800 italic text-xs">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2">Items Ordered</h4>
              <div className="space-y-3">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-[10px]">
                        x{item.quantity}
                      </div>
                      <p className="font-medium text-slate-800">{item.product_name}</p>
                    </div>
                    <p className="font-bold text-slate-900">${item.price_at_order * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <p className="text-slate-500 font-bold">Total Cost</p>
              <p className="text-2xl font-extrabold text-emerald-600">${selectedOrder.total_cost}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Modal */}
      <Modal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} title="Update Order Status">
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={statusData.status}
              onChange={(e) => setStatusData({ ...statusData, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Action Taken / Internal Notes</label>
            <textarea
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
              placeholder="e.g. Called customer, package handed to carrier..."
              value={statusData.actionTaken}
              onChange={(e) => setStatusData({ ...statusData, actionTaken: e.target.value })}
            ></textarea>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsStatusModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {isSubmitting ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageOrders;
