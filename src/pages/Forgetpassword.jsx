import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BreadCrumb from '../Components/common/BreadCrumb';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios.post('https://api.escuelajs.co/api/v1/auth/forgot-password', { email })
      .then((res) => {
        toast.success('Password reset link sent to your email');
        setIsSubmitting(false);
        setEmail('');
      })
      .catch((err) => {
        console.error('Password reset error:', err);
        toast.error('Failed to send password reset link. Try again later.');
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <BreadCrumb title="Forget Password" />
      <div className="flex justify-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Forget Password</h1>
          <p className="text-sm text-gray-600 mb-4 text-center">Enter your email address and we will send you a password reset link.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded"
                type="email"
                name="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-secondary-300 text-white px-4 py-2 rounded hover:bg-secondary-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
