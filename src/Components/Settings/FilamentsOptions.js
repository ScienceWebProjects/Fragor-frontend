// libs

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss

function FilamentsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);

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
          {permission.owner && (
            <StyledLink to={props.api.settingMaterialsOptions}>
              <Button color='yellow'>Materials options</Button>
            </StyledLink>
          )}

          <StyledLink to={props.api.settingColorsOptions}>
            <Button color='yellow'>Colors options</Button>
          </StyledLink>

          <StyledLink to={props.api.settingBrandsOptions}>
            <Button color='yellow'>Brands options</Button>
          </StyledLink>
        </main>

        <StyledLink to={props.api.settingsPage}>
          <Button color='red'>Back</Button>
        </StyledLink>
      </div>
    );
  }
}

export default FilamentsOptions;
