export const AuthService = {
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  },

  async getCurrentUser() {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to get user info');
    }
  },

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
};

// Update UserApiService.js
export const UserApiService = {
  async registerUser(userData) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // After successful registration, log in automatically
      const loginResponse = await AuthService.login(userData.email, userData.password);
      return loginResponse;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async getAllUsers() {
    try {
      const response = await fetch('/api/users', {
        credentials: 'include',
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