// libs
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// utils
import api from 'utils/apiKeys.json';
import SigninPage from 'pages/Signin/SigninPage';

// components
import LoginPage from 'pages/Login/LoginPage';
import HomePage from 'pages/Home/HomePage';
import PrintersPage from 'pages/Printers/PrintersPage';
import PrintersCharts from 'pages/PrintersCharts/PrintersCharts';

const App: React.FC = () => {
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
    {
      path: api.printersPage,
      element: <PrintersPage />,
    },
    {
      path: api.printersCharts,
      element: <PrintersCharts />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
