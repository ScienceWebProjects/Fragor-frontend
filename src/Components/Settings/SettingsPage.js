// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import { FormattedMessage } from 'react-intl';
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import DeleteAccountBox from './Boxes/DeleteAccountBox';
import ChangePinBox from './Boxes/ChangePinBox';
import ChangePasswordBox from './Boxes/ChangePasswordBox';
import ChangeEmailBox from './Boxes/ChangeEmailBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_content.scss';

function SettingsPage(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const navigate = useNavigate();

  const [deleteAccountBox, setDeleteAccountBox] = useState(false);
  const [changePinBox, setChangePinBox] = useState(false);
  const [changePasswordBox, setChangePasswordBox] = useState(false);
  const [changeEmailBox, setChangeEmailBox] = useState(false);

  const deleteAccountHandler = () => {
    setDeleteAccountBox(true);
  };

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
        `${props.api.ip}${props.api.settingLogout}`,
        requestOptions
      );

      if (response.status === 204) {
        console.log('Successful logout');
        sessionStorage.setItem('token', '');
        sessionStorage.clear();
        navigate(props.api.loginPage);
      }

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePinHandler = () => {
    setChangePinBox(true);
  };

  const changePasswordHandler = () => {
    setChangePasswordBox(true);
  };

  const changeEmailHandler = () => {
    setChangeEmailBox(true);
  };

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  if (permission.logged === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar api={props.api} />
        {/* </ header> */}

        <main className='App-header'>
          <div className='content'>
            <h1>
              <FormattedMessage
                id='settings'
                defaultMessage='Settings'
              />
            </h1>
            {!permission.owner && !permission.master && (
              <Button
                className='content-delete'
                color='red'
                onClick={deleteAccountHandler}
              >
                <FormattedMessage
                  id='settings.deleteAccount'
                  defaultMessage='Delete account'
                />
              </Button>
            )}

            <Button
              className=''
              color='red'
              onClick={logoutHandler}
            >
              <FormattedMessage
                id='settings.logout'
                defaultMessage='Log out'
              />
            </Button>
            {(permission.owner || permission.master) && (
              <StyledLink to={props.api.settingsFilamentsOptions}>
                <Button
                  className=''
                  color='blue'
                >
                  <FormattedMessage
                    id='settings.filamentsOptions'
                    defaultMessage='Filaments options'
                  />
                </Button>
              </StyledLink>
            )}
            {(permission.owner || permission.master) && (
              <StyledLink to={props.api.settingsElectricityTariff}>
                <Button
                  className=''
                  color='blue'
                >
                  <FormattedMessage
                    id='settings.electricityTariffs'
                    defaultMessage='Electricity tariffs'
                  />
                </Button>
              </StyledLink>
            )}
            <Button
              className=''
              color='yellow'
              onClick={changePinHandler}
            >
              <FormattedMessage
                id='settings.changePin'
                defaultMessage='Change pin'
              />
            </Button>
            <Button
              className=''
              color='yellow'
              onClick={changePasswordHandler}
            >
              <FormattedMessage
                id='settings.changePassword'
                defaultMessage='Change password'
              />
            </Button>

            <Button
              className=''
              color='yellow'
              onClick={changeEmailHandler}
            >
              <FormattedMessage
                id='settings.changeEmail'
                defaultMessage='Change e-mail'
              />
            </Button>
          </div>

          <StyledLink to={props.api.home}>
            <Button
              className=''
              color='red'
            >
              <FormattedMessage
                id='back'
                defaultMessage='Back'
              />
            </Button>
          </StyledLink>
        </main>
        {deleteAccountBox && (
          <DeleteAccountBox
            api={props.api}
            setDeleteAccountBox={setDeleteAccountBox}
          />
        )}
        {changePinBox && (
          <ChangePinBox
            api={props.api}
            setChangePinBox={setChangePinBox}
            hideCancelBtn={false}
            onSuccess={() => {
              setChangePinBox(false);
              alert('Succesfull PIN changed.');
            }}
          />
        )}
        {changePasswordBox && (
          <ChangePasswordBox
            api={props.api}
            setChangePasswordBox={setChangePasswordBox}
          />
        )}
        {changeEmailBox && (
          <ChangeEmailBox
            api={props.api}
            setChangeEmailBox={setChangeEmailBox}
          />
        )}
      </div>
    );
  }
}

export default SettingsPage;
