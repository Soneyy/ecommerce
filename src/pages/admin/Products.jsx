import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Asidebar from './Asidebar';
import AdminHeader from './AdminHeader';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Pagination from '../../Components/common/Pagination';

Modal.setAppElement('#root'); // Set the app element for accessibility

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page) => {
    axios.get(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * 10}&limit=10`)
      .then(response => {
        setProducts(response.data);
        axios.get('https://api.escuelajs.co/api/v1/products')
          .then(totalRes => {
            const totalProducts = totalRes.data.length;
            setTotalPages(Math.ceil(totalProducts / 10));
          })
          .catch(error => {
            console.error('Error fetching total products:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then(response => {
        toast.success('Product deleted successfully');
        fetchProducts(currentPage); // Refresh products after deletion
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true); 
  };

  const handleUpdateProduct = (productId) => {
    const updatedProductData = {
      title: editingProduct.title,
      price: editingProduct.price,
      description: editingProduct.description,
      
    };

    axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, updatedProductData)
      .then(response => {
        toast.success('Product updated successfully');
        fetchProducts(currentPage); // Refresh products after update
        setEditingProduct(null); // Clear editing state
        setIsModalOpen(false); // Close modal
      })
      .catch(error => {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
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
          <ToastContainer />
          <h1 className="text-3xl font-semibold mb-8">Products</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">ID</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Image</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Title</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Price</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Category</th>
                  <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="w-1/6 py-3 px-4 text-center">{product.id}</td>
                    <td className="w-1/6 py-3 px-4 text-center">
                      <img src={product.images[0]} alt={product.title} className="h-16 w-16 object-cover mx-auto" />
                    </td>
                    <td className="w-1/6 py-3 px-4 text-center">{product.title}</td>
                    <td className="w-1/6 py-3 px-4 text-center">${product.price}</td>
                    <td className="w-1/6 py-3 px-4 text-center">{product.category?.name}</td>
                    <td className="w-1/6 py-3 px-4 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteProduct(product.id)}
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
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Product"
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            {editingProduct && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
                <button
                  className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdateProduct(editingProduct.id)}
                >
                  Save Changes
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Products;
