// libs
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // version 6.14.1

// components
import LoginPage from './Components/Authorization/Login/LoginPage';
import HomePage from './Components/Home/HomePage';
import PrintersList from './Components/Printers/PrintersList';
import FilamentsPage from './Components/Filaments/FilamentsPage';
import FilamentDetails from './Components/Filaments/FilamentDetails';
import PrinterDetails from './Components/Printers/PrinterDetails';
import SigninPage from './Components/Authorization/Signin/SigninPage';
import AddPrinter from './Components/Printers/AddPrinter';
import SettingsPage from './Components/Settings/SettingsPage';

// UI elements
import './App.css';

const endpoints = {
  ip: 'http://127.0.0.1:8080',

  //
  quotes: 'https://type.fit/api/quotes', // 1643 quotes

  // --------- REACT-ROUTER-DOM --------- \\
  //  authorization
  loginPage: '/',
  signinPage: '/signin-page',
  home: '/home',
  // printers
  printersPage: '/printers-page', // printers list
  printerAddPage: '/printer-add',
  // filaments
  filamentsPage: '/filaments-page',
  // settings
  settingsPage: '/settings-page',
  // users
  usersPage: '/users-page',

  // --------- AUTHORIZATION --------- \\
  loginPin: '/api/account/login/pin/', // POST
  loginPassword: '', // POST
  registration: '/api/account/registration/', // POST

  // --------- PRINTERS --------- \\
  printersList: '/api/printer/get/all/', // GET
  printerModelAdd: '/api/printer/model/add/', // POST
  printersModelsGet: '/api/printer/model/get/all/', // GET
  printerAdd: '/api/printer/add/', // POST
  printerDelete: '/api/printer/delete/', // ...{id}/ DELETE
  printerGet: '/api/printer/get/', // ...<id>/ GET

  // --------- DEVICES --------- \\
  deviceAdd: '/api/device/connect/', // ...<printer id> GET

  // --------- FILAMENTS --------- \\
  filamentsFiltered: '/api/filaments/filter/', //  ...<color>/<type>/<quantity>/ GET
  filamentGet: '/api/filaments/get/', // ...<filament id> GET
  filamentsMaterialsGet: '/api/filaments/material/get/all/', // GET

  // --------- SETTINGS --------- \\
  settingLogout: '/api/account/logout/', // DELETE

  // --------- USERS --------- \\
};

function App() {
  const [printerDetails, setPrinterDetails] = useState();
  const [filamentDetails, setFilamentDetails] = useState();

  const printerDetailsHandler = (details) => {
    setPrinterDetails(details);
  };

  const filamentDetailsHandler = (details) => {
    setFilamentDetails(details);
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
    {
      path: endpoints.filamentsPage,
      element: (
        <FilamentsPage
          api={endpoints}
          onFilamentSelect={filamentDetailsHandler}
        />
      ),
    },
    {
      path: `${endpoints.filamentsPage}/:filamentName`,
      element: (
        <FilamentDetails
          api={endpoints}
          details={filamentDetails}
        />
      ),
    },
    {
      path: endpoints.settingsPage,
      element: <SettingsPage api={endpoints} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
