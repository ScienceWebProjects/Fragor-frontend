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
import UsersPage from './Components/Users/UsersPage';
import UserDetails from './Components/Users/UserDetails';

// UI elements
import './App.css';

const endpoints = {
  // ip: 'http://127.0.0.1:8080',
  ip: 'http://192.168.0.3:8080',

  //
  quotes: 'https://type.fit/api/quotes', // 1643 quotes

  // --------- REACT-ROUTER-DOM --------- \\
  //  authorization
  loginPage: '/loginPage',
  signinPage: '/signin-page',
  home: '/',
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
  filamentsColorsGet: '/api/filaments/color/get/all/', // GET
  filamentsBrandsGet: '/api/filaments/brand/get/all/', // GET
  filamentsRandomAdd: '/api/filaments/random/add/', // ...<ammount> GET

  // --------- SETTINGS --------- \\
  settingDeleteAccount: '',
  settingLogout: '/api/account/logout/', // DELETE
  settingPinChange: '/', // PUT
  settingPasswordChange: '/api/account/settings/password/', // PUT
  settingEmailChange: '/', // PUT

  // --------- USERS --------- \\
  usersGetAll: '/api/companies/users/get/all/',
  userGetOne: '/api/companies/users/get/', // ...<id>/ GET
  userGetPermissions: '/-/',
};

function App() {
  const [printerDetails, setPrinterDetails] = useState([]);
  const [filamentDetails, setFilamentDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const printerDetailsHandler = (details) => {
    setPrinterDetails(details);
  };

  const filamentDetailsHandler = (details) => {
    setFilamentDetails(details);
  };

  const userDetailsHandler = (details) => {
    setUserDetails(details);
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
    {
      path: endpoints.usersPage,
      element: (
        <UsersPage
          api={endpoints}
          onUserSelect={userDetailsHandler}
        />
      ),
    },
    {
      path: `${endpoints.usersPage}/:userName`,
      element: (
        <UserDetails
          api={endpoints}
          details={userDetails}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
