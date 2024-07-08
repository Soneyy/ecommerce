import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './AdminHeader';
import Asidebar from "./Asidebar"

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = () => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        const adminUser = response.data.find(user => user.role === 'admin');
        setAdmin(adminUser);
        setUpdatedName(adminUser.name || '');
        setUpdatedEmail(adminUser.email || '');
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
      });
  };

  const handleUpdateAdmin = () => {
    // Perform update logic here, e.g., make an API call to update admin details
    console.log('Update admin details:', updatedName, updatedEmail);
    
    // Simulate success or error
    const isSuccess = true; // Replace with actual success check logic

    if (isSuccess) {
      // Update admin state (simulated)
      setAdmin(prevAdmin => ({
        ...prevAdmin,
        name: updatedName,
        email: updatedEmail
      }));

      // Show success toast message
      toast.success('Admin details updated successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Show error toast message
      toast.error('Failed to update admin details. Please try again later.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex">
          <Asidebar />
          <div className="flex-1 p-8">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <Asidebar />
        <ToastContainer />
        <div className="flex-1 p-8">
          <div className="container mx-auto mt-10 shadow-lg max-w-lg bg-white p-8 rounded-lg">
            <div className="text-center mb-8">
              <img
                src={admin.avatar}
                alt={admin.name || 'Admin Avatar'}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold">{admin.name || 'Admin'}</h1>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button
              className="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdateAdmin}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminProfile;
