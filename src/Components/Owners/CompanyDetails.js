// libs

// hooks
import { useEffect, useState } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import InfoType from '../Authorization/Signin/UI/InfoType';
import Button from '../UI/shared/buttons/Button';
import StyledLink from '../UI/shared/StyledLink';

// scss
import './scss/_company_user-item.scss';
import ChangePermissionBox from '../Users/Boxes/ChangePermissionBox';
import DeleteUserBox from '../Users/Boxes/DeleteUserBox';

function CompanyDetails(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [details, setDetails] = useState(props.details);
  const [users, setUsers] = useState(props.users);
  const [userCompany, setUserCompany] = useState([]);
  const [permissionBox, setPermissionBox] = useState(false);
  const [deleteUserBox, setDeleteUserBox] = useState(false);

  const [copied, setCopied] = useState(false);

  const copyToClipboardHandler = () => {
    const { token } = details;

    // Twój kod do skopiowania wartości tokena do schowka
    navigator.clipboard
      .writeText(token)
      .then(() => setCopied(true))
      .catch((error) => console.error('Błąd kopiowania do schowka:', error))
      .then(() =>
        setTimeout(() => {
          setCopied(false);
        }, 1000)
      );
  };

  useEffect(() => {
    setTimeout(() => {
      const storedCompanyUsers = sessionStorage.getItem('companyUsers');
      setUsers(JSON.parse(storedCompanyUsers));

      const storedCompanyDetails = sessionStorage.getItem('companyDetails');
      setDetails(JSON.parse(storedCompanyDetails));
    }, 500);
  }, []);

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar api={props.api} />
      {/* </ header> */}

      <InfoType
        text={details.company}
        className='company-name'
      />

      <div className='token-wrapper'>
        <h3>{`Token: ${details.token}`}</h3>
        <button
          className='clipboard-btn'
          onClick={copyToClipboardHandler}
        >
          {copied ? 'Skopiowano!' : 'Skopiuj do schowka'}
        </button>
      </div>

      <main className='App-header company-details'>
        <InfiniteScroll
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.4}
          className='users-list'
        >
          {users.map((user) => (
            <div
              className='company_user-item'
              key={`user-${user.id}`}
            >
              <div className='item-user_name'>
                {user.name} {user.surname}
              </div>
              <Button
                className='item-btn'
                color='yellow'
                onClick={() => {
                  setUserCompany(user);
                  setPermissionBox(true);
                }}
              >
                Permits
              </Button>
              <Button
                className='item-btn'
                color='red'
                onClick={() => {
                  setUserCompany(user);
                  setDeleteUserBox(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </InfiniteScroll>
      </main>

      <StyledLink to={props.api.ownersPage}>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </StyledLink>

      {permissionBox && (
        <ChangePermissionBox
          api={props.api}
          details={userCompany}
          onPermissionBox={setPermissionBox}
        />
      )}

      {deleteUserBox && (
        <DeleteUserBox
          api={props.api}
          details={userCompany}
          onDeleteUserBox={setDeleteUserBox}
        />
      )}
    </div>
  );
}

export default CompanyDetails;
