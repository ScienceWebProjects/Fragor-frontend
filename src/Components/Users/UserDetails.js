// libs

// hooks
import { useState, useEffect } from 'react';
// import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';
import ChangePermissionBox from './Boxes/ChangePermissionBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_content.scss';
import './scss/_buttons.scss';
import DeleteUserBox from './Boxes/DeleteUserBox';

function UserDetails(props) {
  const [details, setDetails] = useState(props.details);
  const [permissionBox, setPermissionBox] = useState(false);
  const [deleteUserBox, setDeleteUserBox] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userDetails');
    setDetails(JSON.parse(storedUser));
  }, []);

  const permissionColor =
    details.permission === 'OWNER' || details.permission === 'MASTER'
      ? '#8a100e'
      : details.permission === 'CHANGER'
      ? '#1375bd'
      : '#2f8a07';

  if (!details) {
    return <div>No user selected.</div>;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <div className='btns-wrapper'>
        <Button
          color={'yellow'}
          className='wrapper-btn'
          onClick={() => {
            setPermissionBox(true);
          }}
        >
          Change permission
        </Button>
        <Button
          color={'red'}
          className='wrapper-btn'
          onClick={() => {
            setDeleteUserBox(true);
          }}
        >
          Delete user
        </Button>
      </div>

      <main
        className='App-header'
        style={{ minHeight: 'unset' }}
      >
        <div className='content'>
          <h2>
            {details.name} {details.surname}
          </h2>
          <div style={{ color: permissionColor }}>{details.permission}</div>
          <div>{details.email}</div>
        </div>
      </main>

      <StyledLink to={props.api.usersPage}>
        <Button color={'red'}>Back</Button>
      </StyledLink>

      {permissionBox && (
        <ChangePermissionBox
          api={props.api}
          details={props.details}
          onPermissionBox={setPermissionBox}
        />
      )}

      {deleteUserBox && (
        <DeleteUserBox
          api={props.api}
          details={props.details}
          onDeleteUserBox={setDeleteUserBox}
        />
      )}
    </div>
  );
}

export default UserDetails;
