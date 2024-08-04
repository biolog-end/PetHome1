import axios from 'axios';

const API_URL = '/api/auth'; // Предполагаем, что наш API находится по этому адресу

const authService = {
  register: async (nickname, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        nickname,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (nickname, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: nickname, // Предполагаем, что бэкенд ожидает email, а не nickname
        password
      });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgotpassword`, { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  resetPassword: async (email, token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/resetpassword`, {
        email,
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;