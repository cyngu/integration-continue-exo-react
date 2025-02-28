import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApiService } from '../../api/AuthApiService';
import FormInput from '../../components/FormInput';

/**
 * This component allows users to log in by providing their email address and password.
 * On successful login, the user is redirected to the users page. In case of failure, an error message is displayed.
 * @component
 */
function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the submission of the login form.
   *
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthApiService.login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/integration-continue-exo-react/users');
    } catch (error) {
      toast.error(error.message || 'Error during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full"
          />
          <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full"
          />
          <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg text-white ${
                  !isLoading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'
              }`}
              disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
              to="/integration-continue-exo-react"
              className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Don't have an account? Sign up here
          </Link>
        </div>
      </div>
  );
}

export default LoginForm;
