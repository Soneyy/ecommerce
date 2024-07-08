import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Asidebar from './Asidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://api.example.com/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <Asidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-8">Orders</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Customer Name</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Status</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="w-1/6 py-3 px-4">{order.id}</td>
                    <td className="w-1/6 py-3 px-4">{order.customerName}</td>
                    <td className="w-1/6 py-3 px-4">${order.totalAmount}</td>
                    <td className="w-1/6 py-3 px-4">{order.status}</td>
                    {/* Add more columns as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
