// libs
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import LoginPage from './Components/Authorization/LoginPage';
import HomePage from './Components/home/HomePage';

// UI elements
import './App.css';

const endpoints = {
  ip: 'http://127.0.0.1:8080',

  // REACT-ROUTER-DOM
  loginPage: '/',
  home: '/home',
  signinPage: '/signin-page',
};

function App() {
  const router = createBrowserRouter([
    { path: endpoints.loginPage, element: <LoginPage api={endpoints} /> },
    { path: endpoints.home, element: <HomePage api={endpoints} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
