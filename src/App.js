// libs
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // version 6.14.1

// components
import LoginPage from './Components/Authorization/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import PrintersList from './Components/Printers/PrintersList';
import FilamentsPage from './Components/Filaments/FilamentsPage';
import PrinterDetails from './Components/Printers/PrinterDetails';
import SigninPage from './Components/Authorization/Signin/SigninPage';
import AddPrinter from './Components/Printers/AddPrinter';

// UI elements
import './App.css';

const endpoints = {
  ip: 'http://127.0.0.1:8080',

  //
  quotes: 'https://type.fit/api/quotes', // 1643 quotes

  // REACT-ROUTER-DOM
  loginPage: '/',
  signinPage: '/signin-page',
  home: '/home',
  printersPage: '/printers-page',
  printerAddPage: '/printer-add',
  filamentsPage: '/filaments-page',
  settingsPage: '/settings-page',
  usersPage: '/users-page',

  // authorization
  loginPin: '/api/account/login/pin/', // POST
  loginPassword: '', // POST
  registration: '/api/account/registration/', // POST

  // printers
  printersList: '/api/printer/get/all/', // GET
  printerModelAdd: '/api/printer/model/add/', // POST
  printersModelsGet: '/api/printer/model/get/all/', // GET
  printerAdd: '/api/printer/add/', // POST
  printerDelete: '/api/printer/model/delete/', // ...{id}/ DELETE
  printerGet: '/api/printer/get/', // ...<id>/ GET

  // devices
  deviceAdd: '/api/device/connect/', // ...<printer id> GET

  // filaments

  // settings

  // users
};

function App() {
  const [printerDetails, setPrinterDetails] = useState();

  const printerDetailsHandler = (details) => {
    setPrinterDetails(details);
  };

  const router = createBrowserRouter([
    { path: endpoints.loginPage, element: <LoginPage api={endpoints} /> },
    { path: endpoints.signinPage, element: <SigninPage api={endpoints} /> },
    { path: endpoints.home, element: <HomePage api={endpoints} /> },

    {
      path: endpoints.printersPage,
      element: (
        <PrintersList
          api={endpoints}
          onPrinterSelect={printerDetailsHandler}
        />
      ),
    },
    {
      path: `${endpoints.printersPage}/:printerName`,
      element: (
        <PrinterDetails
          api={endpoints}
          details={printerDetails}
        />
      ),
    },
    { path: `${endpoints.printerAddPage}`, element: <AddPrinter api={endpoints} /> },
    { path: endpoints.filamentsPage, element: <FilamentsPage api={endpoints} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
