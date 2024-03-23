// libs
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store/rootReducer';

// components
import LoginPage from 'pages/Login/LoginPage';

const App: React.FC = () => {
  // const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
