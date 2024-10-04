import React from 'react';
import { loginWithGoogle } from '../api/authService';



const Login = () => {

  const handleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
