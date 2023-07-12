// libs
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import LoginPage from './Components/Authorization/LoginPage';
import HomePage from './Components/Home/HomePage';
import PrintersPage from './Components/Printers/PrintersPage';
import FilamentsPage from './Components/Filaments/FilamentsPage';

// UI elements
import './App.css';

const endpoints = {
  ip: 'http://127.0.0.1:8080',

  // REACT-ROUTER-DOM
  loginPage: '/',
  home: '/home',
  signinPage: '/signin-page',
  printersPage: '/printers-page',
  filamentsPage: '/filaments-page',
  settingsPage: '/settings-page',
  usersPage: '/users-page',
};

function App() {
  const router = createBrowserRouter([
    { path: endpoints.loginPage, element: <LoginPage api={endpoints} /> },
    { path: endpoints.home, element: <HomePage api={endpoints} /> },
    { path: endpoints.printersPage, element: <PrintersPage api={endpoints} /> },
    { path: endpoints.filamentsPage, element: <FilamentsPage api={endpoints} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
