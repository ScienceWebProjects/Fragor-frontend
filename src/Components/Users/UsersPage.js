// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserItem from './UI/UserItem';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_content.scss';

function UsersPage(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [usersList, setUsersList] = useState([]);

  const makeApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.usersGetAll}`, requestOptions);

      if (response.status === 200) {
        const users = await response.json();
        setUsersList(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeApiCall();
  });

  const userSelectionHandler = (user) => {
    props.onUserSelect(user);
  };

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  if (permission.logged === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main className='App-header'>
          <div className='content'>
            <h1>Users</h1>

            <InfiniteScroll
              dataLength={0}
              hasMore={true}
              height={windowSize * 0.6}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {usersList.map((user) => (
                <Button
                  color='blue'
                  key={`btn-${user.id}`}
                  className='user-button'
                >
                  <UserItem
                    user={user}
                    api={props.api}
                    onUserSelect={userSelectionHandler}
                  />
                </Button>
              ))}
            </InfiniteScroll>
          </div>
        </main>

        <StyledLink to={props.api.home}>
          <Button
            className=''
            color='red'
          >
            Back
          </Button>
        </StyledLink>
      </div>
    );
  }
}

export default UsersPage;
