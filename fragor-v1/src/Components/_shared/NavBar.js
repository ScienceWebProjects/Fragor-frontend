// libs

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import { useNavigate } from 'react-router-dom';

// components
import { FormattedMessage } from 'react-intl';

// UI elements
import Button from '../UI/shared/buttons/Button';
import StyledLink from '../UI/shared/StyledLink';

// scss
import './UI/_navBar.scss';

function NavBar({ api, backBtnLink }) {
  const user = useToken();
  const permission = usePermissions(user);
  const navigate = useNavigate();

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
    <div className='menu__desc'>
      <nav className='desc__nav'>
        <StyledLink
          to={api.home}
          className=''
        >
          <Button
            className='desc__btn'
            color='green'
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
            className='desc__btn'
            color='blue'
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
            className='desc__btn '
            color='blue'
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
            className='desc__btn '
            color='blue'
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
              className='desc__btn'
              color='blue'
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
              className='desc__btn'
              color='blue'
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
              className='desc__btn'
              color='blue'
            >
              <FormattedMessage
                id='home.devices'
                defaultMessage='Devices'
              />
            </Button>
          </StyledLink>
        )}
        <Button
          className='desc__btn'
          color='yellow'
          onClick={logoutHandler}
        >
          Log out
        </Button>

        <StyledLink to={backBtnLink}>
          <Button
            className='desc__btn'
            color='red'
          >
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </Button>
        </StyledLink>
      </nav>
    </div>
  );
}

export default NavBar;
