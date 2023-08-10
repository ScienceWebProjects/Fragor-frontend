// libs
import React from 'react';

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import ClockAndDate from './ClockAndDate';
import Quotes from './Quotes';
import Button from '../UI/shared/buttons/Button';
import LogoutUser from '../_shared/LogoutUser';

// UI elements
import StyledLink from '../UI/shared/StyledLink';

// scss
import './UI/_wrapper_button.scss';

function HomePage(props) {
  const user = useToken();
  const permission = usePermissions(user);

  if (permission.logged === 'logout') {
    return <LogoutUser />;
  }

  if (permission.logged === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main
          className='App-header'
          style={{ minHeight: 'unset' }}
        >
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
              {(permission.owner || permission.master) && (
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
