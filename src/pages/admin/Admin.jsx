

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Asidebar from './Asidebar';

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const user = useSelector(state => state.user.value);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchTotalUsers();
      fetchTotalProducts();
      fetchTotalOrders();
      fetchRecentTransactions();
    }
  }, [user]);

  const fetchTotalUsers = () => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.role !== 'admin');
        setTotalUsers(filteredUsers.length);
      })
      .catch(error => {
        console.error('Error fetching total users:', error);
      });
  };

  const fetchTotalProducts = () => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        setTotalProducts(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching total products:', error);
      });
  };

  const fetchTotalOrders = () => {
    
    setTotalOrders(10);
  };

  const fetchRecentTransactions = () => {
    
    const demoTransactions = [
      { id: 1, productName: 'Shoes', amount: '$50', status: 'Pending' },
      { id: 2, productName: 'Bag', amount: '$30', status: 'Completed' },
      { id: 3, productName: 'Trouser', amount: '$20', status: 'Pending' },
      { id: 4, productName: 'Hoodie', amount: '$80', status: 'Completed' },
      { id: 5, productName: 'Chair', amount: '$60', status: 'Pending' }
    ];
    setRecentTransactions(demoTransactions);
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AdminHeader />
      <div className="flex min-h-screen bg-gray-100">
        <Asidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-red-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer</h2>
              <p className="text-gray-600 text-xl">Total Customer: {totalUsers}</p>
            </div>
            <div className="bg-green-300 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
              <p className="text-gray-600 text-xl">Total Products: {totalProducts}</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
              <p className="text-gray-600 text-xl">Total Orders: {totalOrders}</p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-white bg-gray-500">Product Name</th>
                  <th className="py-2 px-4 text-white bg-gray-500">Amount</th>
                  <th className="py-2 px-4 text-white bg-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 text-center">{transaction.productName}</td>
                    <td className="py-2 px-4 text-center">{transaction.amount}</td>
                    <td className="py-2 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-white ${transaction.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
