import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const UserAPI = {
    createUser: async (userData) => {
        try {
            // Transform the data to match backend schema
            const transformedData = {
                name: userData.lastName,
                firstname: userData.firstName,
                email: userData.email,
                birthDate: new Date(userData.birthDate),
                city: userData.city,
                zipcode: userData.zipCode,
            };

            const response = await api.post('/users', transformedData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};