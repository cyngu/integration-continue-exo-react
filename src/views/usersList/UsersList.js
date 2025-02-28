import React, { useEffect, useState } from 'react';
import { UserApiService } from '../../api/UserApiService';
import { AuthApiService } from '../../api/AuthApiService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

/**
 * This component fetches and displays a list of users from the API.
 * It also provides a logout button that allows the user to log out.
 * While loading, a loading message is displayed, and in case of an error,
 * an error message is shown.
 * @component
 */
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * This function retrieves user data and updates the state with the fetched users.
   * In case of an error, it sets the error state.
   */
  const fetchUsers = async () => {
    try {
      const userData = await UserApiService.getAllUsers();
      setUsers(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * This function logs the user out and navigates them back to the login page.
   * In case of an error during logout, an error message is displayed.
   */
  const handleLogout = async () => {
    try {
      await AuthApiService.logout();
      navigate('/integration-continue-exo-react');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User List</h1>
          <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zip Code
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.zipcode}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default UsersList;