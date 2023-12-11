// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import { FormattedMessage } from 'react-intl';
import Button from '../UI/shared/buttons/Button';

// UI elements
import logo from '../../Images/icon-white.png';
import StyledLink from '../UI/shared/StyledLink';
import TopBarButton from './UI/TopBarButton';

// scss
import './UI/_topbar.scss';

function TopBar({ api }) {
  const user = useToken();
  const permission = usePermissions(user);
  const navigate = useNavigate();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const logoutHandler = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.ip}${api.settingLogout}`,
        requestOptions
      );

      if (response.status === 204) {
        console.log('Successful logout');
        sessionStorage.setItem('token', '');
        sessionStorage.clear();
        navigate(api.loginPage);
      }

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='topbar'>
      <div className='topbar_logo-wrapper'>
        <StyledLink
          to={api.home}
          className='logo-link'
        >
          <div className='logo-wrapper_txt '>FraGor StartUp</div>
          <img
            src={logo}
            alt='Logo'
          />
        </StyledLink>
      </div>
      <div className='topbar_menu'>
        <TopBarButton
          isMenuActive={isMenuActive}
          onTopBarButton={setIsMenuActive}
        />
      </div>

      {isMenuActive && (
        <div
          className='shadow'
          onClick={() => setIsMenuActive(false)}
        >
          <div
            className='menu-panel'
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Menu</h2>

            <nav className='menu-btns'>
              <StyledLink
                to={api.home}
                className=''
              >
                <Button
                  className='menu-btn'
                  color='green'
                  onClick={() => setIsMenuActive(false)}
                >
                  <FormattedMessage
                    id='menu.home'
                    defaultMessage='Home'
                  />
                </Button>
              </StyledLink>
              <StyledLink
                to={api.printersPage}
                className=''
              >
                <Button
                  className='menu-btn'
                  color='red'
                  onClick={() => setIsMenuActive(false)}
                >
                  <FormattedMessage
                    id='home.printers'
                    defaultMessage='Printers'
                  />
                </Button>
              </StyledLink>
              <StyledLink
                to={api.filamentsPage}
                className=''
              >
                <Button
                  className='menu-btn '
                  color='red'
                  onClick={() => setIsMenuActive(false)}
                >
                  <FormattedMessage
                    id='home.filaments'
                    defaultMessage='Filaments'
                  />
                </Button>
              </StyledLink>
              <StyledLink
                to={api.settingsPage}
                className=''
              >
                <Button
                  className='menu-btn '
                  color='red'
                  onClick={() => setIsMenuActive(false)}
                >
                  <FormattedMessage
                    id='home.settings'
                    defaultMessage='Settings'
                  />
                </Button>
              </StyledLink>
              {(permission.owner || permission.master) && (
                <StyledLink
                  to={api.usersPage}
                  className=''
                >
                  <Button
                    className='menu-btn'
                    color='red'
                    onClick={() => setIsMenuActive(false)}
                  >
                    <FormattedMessage
                      id='home.users'
                      defaultMessage='Users'
                    />
                  </Button>
                </StyledLink>
              )}
              {permission.owner && (
                <StyledLink
                  to={api.ownersPage}
                  className=''
                >
                  <Button
                    className='menu-btn'
                    color='red'
                    onClick={() => setIsMenuActive(false)}
                  >
                    <FormattedMessage
                      id='home.owners'
                      defaultMessage='Owners'
                    />
                  </Button>
                </StyledLink>
              )}

              {permission.changer && (
                <StyledLink
                  to={api.devicesPage}
                  className=''
                >
                  <Button
                    className='menu-btn'
                    color='red'
                    onClick={() => setIsMenuActive(false)}
                  >
                    <FormattedMessage
                      id='home.devices'
                      defaultMessage='Devices'
                    />
                  </Button>
                </StyledLink>
              )}
              <Button
                className='menu-btn'
                color='yellow'
                onClick={logoutHandler}
              >
                Log out
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopBar;
