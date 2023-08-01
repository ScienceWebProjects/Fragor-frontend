// libs
import React from 'react';

// hooks
import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';
import ClockAndDate from './ClockAndDate';
import Quotes from './Quotes';
import Button from '../UI/shared/buttons/Button';

// UI elements
import StyledLink from '../UI/shared/StyledLink';

// scss
import './UI/_wrapper_button.scss';

function HomePage(props) {
  const user = useToken();

  const loggedUser = user ? 'logged' : 'logout';

  const masterUser =
    loggedUser === 'logged' && (user.permission === 'MASTER_USER' || user.permission === 'OWNER')
      ? true
      : false;

  if (loggedUser === 'logout') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main
          className='App-header'
          style={{ color: '#000' }}
        >
          You don't have accsess to this page. Please login.
        </main>
      </div>
    );
  }

  if (loggedUser === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main className='App-header'>
          <div className='App-content_wrapper'>
            <ClockAndDate />
            <Quotes />

            <div className='wrapper_buttons'>
              <StyledLink to={props.api.printersPage}>
                <Button
                  className='wrapper_button'
                  color='red'
                >
                  Printers
                </Button>
              </StyledLink>
              <StyledLink to={props.api.filamentsPage}>
                <Button
                  className='wrapper_button'
                  color='red'
                >
                  Filaments
                </Button>
              </StyledLink>
              <StyledLink to={props.api.settingsPage}>
                <Button
                  className='wrapper_button'
                  color='red'
                >
                  Settings
                </Button>
              </StyledLink>
              {masterUser && (
                <StyledLink to={props.api.usersPage}>
                  <Button
                    className='wrapper_button'
                    color='red'
                  >
                    Users
                  </Button>
                </StyledLink>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default HomePage;
