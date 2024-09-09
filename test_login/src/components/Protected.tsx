import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Protected: React.FC = () => {
  const [message, setMessage] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:3000/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.msg);
      } catch (err) {
        console.error(err);
        setMessage('Error fetching data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Protected;
