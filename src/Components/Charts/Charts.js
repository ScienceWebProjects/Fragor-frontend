// libs

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// UI elements

// scss

function Charts({ api }) {
  const user = useToken();
  const permission = usePermissions(user);

  if (permission.logged === 'logout') {
    return <LogoutUser api={api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'></main>
      <StyledLink to={api.printersPage}>
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

export default Charts;
