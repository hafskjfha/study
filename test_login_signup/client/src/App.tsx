import React,{useState,Dispatch, SetStateAction} from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';


interface GoogleAuthRedirectProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

// QueryClient 생성
const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로컬스토리지에서 토큰 확인하여 로그인 상태 업데이트
  const { refetch } = useQuery(
    'checkToken',
    () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        return Promise.reject('n');
      }
      return axios.get('https://localhost:443/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    {
      enabled: false, // 쿼리 자동 실행 비활성화
      retry: 1,
      onSuccess: () => {
        setIsLoggedIn(true); // 토큰이 유효하면 로그인 상태 true로 설정
      },
      onError: () => {
        localStorage.removeItem('token'); // 유효하지 않은 토큰은 제거
        setIsLoggedIn(false); // 로그인 상태 false로 설정
        navigate('/')
        
      },
    }
  );

  // 컴포넌트 마운트 시 토큰 검증
  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/auth/google/signup/redirect" element={<GoogleAuthRedirect setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/google/login/redirect" element={<GoogleAuthRedirect setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};



const GoogleAuthRedirect:React.FC<GoogleAuthRedirectProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  const path = window.location.pathname;

  const isSignup = path.includes('signup');

  const queryKey = isSignup ? 'signup' : 'login';

  const { data, error, isLoading } = useQuery(
    [queryKey, code],
    () => {
      const url = isSignup
        ? `https://localhost:443/auth/google/signup/redirect?code=${code}`
        : `https://localhost:443/auth/google/login/redirect?code=${code}`;
      return axios.get(url);
    },
    {
      enabled: !!code, // code가 있을 때만 쿼리 실행
      onSuccess: (response) => {
        if (isSignup) {
          const mes = response.data.message;
          alert(mes);
          navigate('/');
        } else {
          const token = response.data.token;
          if (token) {
            localStorage.setItem('token', token);
            setIsLoggedIn(true); // 로그인 상태 업데이트
            navigate('/profile');
          } else {
            alert('Authentication failed, no token received');
          }
        }
      },
      onError: (error) => {
        alert('Authentication failed');
        console.error('Error during authentication:', error);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return null; // 이 컴포넌트는 실제 UI를 렌더링하지 않음
};

interface ProfileProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ setIsLoggedIn }) => {
  const [profileData, setProfileData] = React.useState<any>(null);
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery('profile', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      throw new Error('No token found');
    }
    return axios
      .get('https://localhost:443/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => { throw err });
  }, {
    enabled: !!localStorage.getItem('token'),
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    onSuccess: (response) => {
      if (response.data.code === 401) {
        navigate('/');
      }
      setProfileData(response.data.data);
    },
    onError: (error: any) => {
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        setIsLoggedIn(false); // 로그아웃 시 상태 변경
        navigate('/');
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 제거
    setIsLoggedIn(false); // 로그인 상태 false로 설정
    navigate('/'); // 홈으로 이동
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching profile</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>ID: {profileData?.id}</p>
      <p>Email: {profileData?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};



// QueryClientProvider로 애플리케이션 감싸기
const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Root;
