import api from './api';

export const AdminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },
};
