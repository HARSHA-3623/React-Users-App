import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight, X, User } from 'lucide-react';
import { getUsers, deleteUser, updateUser } from '../services/api';

// Component for displaying user avatar and basic info
const UserAvatar = ({ user }) => (
  <div className="flex items-center">
    <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-gray-200"
      />
    </div>
  </div>
);

// Component for displaying user name and email
const UserInfo = ({ user }) => (
  <div>
    <div className="text-sm font-medium text-gray-900">
      {user.first_name} {user.last_name}
    </div>
    <div className="text-xs text-gray-500 sm:hidden">
      {user.email}
    </div>
  </div>
);

// Component for action buttons (edit and delete)
const UserActions = ({ onEdit, onDelete }) => (
  <div className="flex items-center justify-end space-x-2 sm:space-x-3">
    <button
      onClick={onEdit}
      className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
      title="Edit user"
    >
      <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-900 transition-colors duration-150"
      title="Delete user"
    >
      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  </div>
);

// Component for the edit modal
const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 sm:w-96 shadow-lg rounded-xl bg-white">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit User</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 transition-colors duration-150"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-150"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main UserList component
export function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Handle user deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        setSuccess('User deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // Handle user update
  const handleUpdate = async (formData) => {
    try {
      const updatedUser = await updateUser(editingUser.id, formData);
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...updatedUser } : user
      ));
      setEditingUser(null);
      setSuccess('User updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users Management</h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <User className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-sm">Total Users: {users.length}</span>
        </div>
      </div>
      
      {/* Error and success messages */}
      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Users table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avatar
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-indigo-200"></div>
                        <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      <UserAvatar user={user} />
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                      <UserInfo user={user} />
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <UserActions 
                        onEdit={() => setEditingUser(user)}
                        onDelete={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}
      
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 sm:mt-8 space-x-3 sm:space-x-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || isLoading}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}