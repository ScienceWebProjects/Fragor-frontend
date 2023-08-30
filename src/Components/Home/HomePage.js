// libs
import React from 'react';

// hooks
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (permission.logged === 'logout') {
      navigate(props.api.loginPage);
    }
  }, []);

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
              <StyledLink
                to={props.api.printersPage}
                className='area-printers'
              >
                <Button
                  className='wrapper_button '
                  color='red'
                >
                  Printers
                </Button>
              </StyledLink>
              <StyledLink
                to={props.api.filamentsPage}
                className='area-filaments'
              >
                <Button
                  className='wrapper_button '
                  color='red'
                >
                  Filaments
                </Button>
              </StyledLink>
              <StyledLink
                to={props.api.settingsPage}
                className='area-settings'
              >
                <Button
                  className='wrapper_button '
                  color='red'
                >
                  Settings
                </Button>
              </StyledLink>
              {(permission.owner || permission.master) && (
                <StyledLink
                  to={props.api.usersPage}
                  className='area-users'
                >
                  <Button
                    className='wrapper_button'
                    color='red'
                  >
                    Users
                  </Button>
                </StyledLink>
              )}
              {permission.owner && (
                <StyledLink
                  to={props.api.ownersPage}
                  className='area-owners'
                >
                  <Button
                    className='wrapper_button'
                    color='red'
                  >
                    Owners
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
