/* eslint-disable no-unused-vars */

import{ useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import { useAppStore } from './store';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constants';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        }
        else {
          setUserInfo(undefined);
        }
        console.log({response}); 
      }  catch (error) {
        userInfo(undefined);
      }
      finally {
        setloading(false);
      }
    }
    if (!userInfo) {
      getUserData()
    }
    else {
      setloading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
          <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App