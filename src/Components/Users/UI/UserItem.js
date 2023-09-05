// libs

// hooks

// components
import StyledLink from '../../UI/shared/StyledLink';

// UI elements

// scss
import '../scss/_user-item.scss';

function UserItem(props) {
  const userDetailsHandler = async () => {
    props.onUserSelect(props.user);
    sessionStorage.setItem('userDetails', JSON.stringify(props.user));
  };

  return (
    <StyledLink
      to={{
        pathname: `${props.api.usersPage}/user-${props.user.id}`,
        state: { user: props.user },
      }}
      style={{ cursor: 'pointer', width: '100%' }}
      className='user-item'
      onClick={userDetailsHandler}
    >
      <h2>
        {props.user.name} {props.user.surname}
      </h2>
    </StyledLink>
  );
}

export default UserItem;
