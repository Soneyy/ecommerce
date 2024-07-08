import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Asidebar from './Asidebar';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slice/userSlice'; 
import AdminHeader from './AdminHeader';
import Pagination from '../../Components/common/Pagination'; 

const Users = () => {
  const dispatch = useDispatch(); 
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/users?offset=${(page - 1) * 10}&limit=10`);
      const filteredUsers = response.data.filter(user => user.role !== 'admin');
      setUsers(filteredUsers);

      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/users');
      const totalFilteredUsers = totalResponse.data.filter(user => user.role !== 'admin').length;
      setTotalPages(Math.ceil(totalFilteredUsers / 10));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateUser = async (userId) => {
    const updatedUserData = {
      email: 'john@mail.com',
      name: 'Change name'
     
    };
  
    try {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${userId}`, updatedUserData);
      console.log('User updated successfully');
      fetchUsers(currentPage); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${userId}`);
      dispatch(removeUser(userId));
      fetchUsers(currentPage); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <Asidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-8">Users</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">ID</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Name</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Email</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Role</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="w-1/6 py-3 px-4 text-center">{user.id}</td>
                    <td className="w-1/6 py-3 px-4 text-center">{user.name}</td>
                    <td className="w-1/6 py-3 px-4 text-center">{user.email}</td>
                    <td className="w-1/6 py-3 px-4 text-center">{user.role}</td>
                    <td className="w-1/6 py-3 px-4 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleUpdateUser(user.id)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setPage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
