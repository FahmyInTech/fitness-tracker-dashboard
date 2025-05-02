import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
};

export const userService = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (profileData) => api.put('/api/users/profile', profileData),
};

export const activityService = {
  getActivities: () => api.get('/api/activities'),
  createActivity: (activityData) => api.post('/api/activities', activityData),
  updateActivity: (id, activityData) => api.put(`/api/activities/${id}`, activityData),
  deleteActivity: (id) => api.delete(`/api/activities/${id}`),
};

export default api; 