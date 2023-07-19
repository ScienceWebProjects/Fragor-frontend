// libs
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // version 6.14.1

// components
import LoginPage from './Components/Authorization/LoginPage';
import HomePage from './Components/Home/HomePage';
import PrintersList from './Components/Printers/PrintersList';
import FilamentsPage from './Components/Filaments/FilamentsPage';
import PrinterDetails from './Components/Printers/PrinterDetails';

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

  // authorization

  // printers
  printersList: '/api/printer/get/',

  // filaments

  // settings

  // users
};

function App() {
  const router = createBrowserRouter([
    { path: endpoints.loginPage, element: <LoginPage api={endpoints} /> },
    { path: endpoints.home, element: <HomePage api={endpoints} /> },
    { path: endpoints.printersPage, element: <PrintersList api={endpoints} /> },
    { path: `${endpoints.printersPage}/:printerName`, element: <PrinterDetails api={endpoints} /> },
    { path: endpoints.filamentsPage, element: <FilamentsPage api={endpoints} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
