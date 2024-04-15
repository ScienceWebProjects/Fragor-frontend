// libs
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store/rootReducer';

// components
import LoginPage from 'pages/Login/LoginPage';
import HomePage from 'pages/Home/HomePage';

// utils
import api from 'utils/apiKeys.json';
import SigninPage from 'pages/Signin/SigninPage';

const App: React.FC = () => {
  // const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const router = createBrowserRouter([
    {
      path: api.loginPage,
      element: <LoginPage />,
    },
    {
      path: api.signinPage,
      element: <SigninPage />,
    },
    {
      path: api.home,
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
