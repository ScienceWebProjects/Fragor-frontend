// libs

// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
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
      const response = await fetch(`${props.api.ip}${props.api.settingLogout}`, requestOptions);

      if (response.status === 204) {
        console.log('Successful logout');
        navigate(props.api.home);
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
    return <LogoutUser />;
  }
  if (permission.logged === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main className='App-header'>
          <div className='content'>
            <h1>Settings</h1>
            {permission.changer && (
              <Button
                className='content-delete'
                color='red'
                onClick={deleteAccountHandler}
              >
                Delete account
              </Button>
            )}
            {deleteAccountBox && <DeleteAccountBox api={props.api} />}
            <Button
              className=''
              color='red'
              onClick={logoutHandler}
            >
              Log out
            </Button>
            {permission.owner && (
              <Button
                className=''
                color='blue'
              >
                Filaments options
              </Button>
            )}
            <Button
              className=''
              color='yellow'
              onClick={changePinHandler}
            >
              Change pin
            </Button>
            {changePinBox && <ChangePinBox api={props.api} />}

            <Button
              className=''
              color='yellow'
              onClick={changePasswordHandler}
            >
              Change password
            </Button>
            {changePasswordBox && <ChangePasswordBox api={props.api} />}

            <Button
              className=''
              color='yellow'
              onClick={changeEmailHandler}
            >
              Change e-mail
            </Button>
            {changeEmailBox && <ChangeEmailBox api={props.api} />}
          </div>

          <StyledLink to={props.api.home}>
            <Button
              className=''
              color='red'
            >
              Back
            </Button>
          </StyledLink>
        </main>
      </div>
    );
  }
}

export default SettingsPage;
