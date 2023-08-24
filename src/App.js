// REST API
import endpoints from './endpoints.json';

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
import FilamentsOptions from './Components/Settings/FilamentsOptions';
import UsersPage from './Components/Users/UsersPage';
import UserDetails from './Components/Users/UserDetails';

// UI elements
import './App.css';

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
      path: endpoints.settingsFilamentsOptions,
      element: <FilamentsOptions api={endpoints} />,
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
