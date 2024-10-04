// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  return (
    <div>
      <h1>Welcome to the OAuth App</h1>
      {!isLoggedIn && ( // 로그인 상태가 아닐 때만 표시
        <nav>
          <Link to="/login">
            <button>Log in</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Home;
