import {AuthService} from "./AuthService";

export const UserApiService = {
  async registerUser(userData) {
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const loginResponse = await AuthService.login(userData.email, userData.password);

      if (loginResponse.token) {
        localStorage.setItem('token', loginResponse.token);
      }

      const users = await this.getAllUsers();

      return users;

    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async getAllUsers() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }
};