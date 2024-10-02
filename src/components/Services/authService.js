import { jwtDecode } from 'jwt-decode';

const API_URL = '/api/auth';

const authService = {
  async register(nickname, contact, password) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, identifier: contact, password }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(parsedError.message || 'Registration failed');
      } catch (e) {
        throw new Error(errorData || 'Registration failed');
      }
    }

    return response.json();
  },

  async confirmRegistration(identifier, nickname, password, confirmationCode) {
    const response = await fetch(`${API_URL}/confirm-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, nickname, password, confirmationCode }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Confirmation failed');
    }

    const responseText = await response.text();

    try {
      return JSON.parse(responseText);
    } catch (error) {
      return responseText;
    }
  },

  async login(identifier, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(parsedError.message || 'Login failed');
      } catch (e) {
        throw new Error(errorData || 'Login failed');
      }
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  },

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.username : null;
    }
    return null;
  },

  async requestPasswordReset(identifier) {
    const response = await fetch(`${API_URL}/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(parsedError.message || 'Password reset request failed');
      } catch (e) {
        throw new Error(errorData || 'Password reset request failed');
      }
    }

    return response.json();
  },

  async resetPassword(identifier, code, newPassword) {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, code, newPassword }),
    });
  
    if (!response.ok) {
      const errorData = await response.text();
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(parsedError.message || 'Password reset failed');
      } catch (e) {
        throw new Error(errorData || 'Password reset failed');
      }
    }
  
    return response.json();
  },

  logout() {
    localStorage.removeItem('token');
  },
};

export default authService;