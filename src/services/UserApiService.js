// src/services/UserApiService.js
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
  
        return await response.json();
      } catch (error) {
        throw new Error(error.message || 'Registration failed');
      }
    },
  
    async getAllUsers() {
      try {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return await response.json();
      } catch (error) {
        throw new Error('Failed to fetch users: ' + error.message);
      }
    }
  };