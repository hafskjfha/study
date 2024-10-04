import axios from 'axios';

// Base URL of the backend server
const API_BASE_URL = 'https://localhost:443';

export const loginWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/login`;
};

export const signupWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/signup`;
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
