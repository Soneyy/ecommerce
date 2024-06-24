import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../Components/AxiosInstance';
import { setReduxUser } from '../redux/slice/userSlice';
import BreadCrumb from '../Components/common/BreadCrumb';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    } else {
      // Initialize formData from localStorage if available
      const storedData = JSON.parse(localStorage.getItem('formData'));
      if (storedData) {
        setFormData(storedData);
      } else {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          avatar: user.avatar || '',
        });
      }
    }
  }, [user]);

  const fetchUserProfile = () => {
    axiosInstance.get('/auth/profile')
      .then((res) => {
        console.log('Profile fetched:', res.data);
        dispatch(setReduxUser(res.data));
        setFormData({
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.avatar,
        });
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/users/${user.id}`, formData)
      .then((res) => {
        toast.success('Profile updated successfully');
        dispatch(setReduxUser(res.data));
        // Update local storage with updated formData
        localStorage.setItem('formData', JSON.stringify(formData));
      })
      .catch((err) => {
        console.error('Update error:', err);
        toast.error('Something went wrong. Try again later.');
      });
  };

  return (
    <>
      <BreadCrumb title="Profile" />
      <div className="container mx-auto mt-10 p-8 shadow-lg max-w-lg">
        <div className="text-center mb-8">
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt={formData.name || 'User Avatar'}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <h1 className="text-2xl font-bold">{formData.name || 'User'}</h1>
        </div>
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Address"
            />
          </div>
          <div>
            <input
              name="avatar"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="Avatar URL"
            />
          </div>
          <button type="submit" className="w-full bg-secondary-300 text-white px-4 py-2 rounded hover:bg-secondary-200">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
