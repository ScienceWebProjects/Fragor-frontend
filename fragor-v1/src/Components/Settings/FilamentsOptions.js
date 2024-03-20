// libs

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import NavBar from '../_shared/NavBar';
import LogoutUser from '../_shared/LogoutUser';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import '../../App.css';
import '../UI/shared/_media-queries.scss';
import './scss/_FilamentOptions.scss';

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
        <TopBar api={props.api} />
        {/* </ header> */}

        <div className='media-background'>
          <div className='media__content'>
            <NavBar
              api={props.api}
              backBtnLink={props.api.settingsPage}
            />

            <main className='App-header filament-options__content'>
              {permission.owner && (
                <StyledLink to={props.api.settingMaterialsOptions}>
                  <Button
                    className='filament-options__content--btn'
                    color='yellow'
                  >
                    Materials options
                  </Button>
                </StyledLink>
              )}

              <StyledLink to={props.api.settingColorsOptions}>
                <Button
                  className='filament-options__content--btn'
                  color='yellow'
                >
                  Colors options
                </Button>
              </StyledLink>

              <StyledLink to={props.api.settingBrandsOptions}>
                <Button
                  className='filament-options__content--btn'
                  color='yellow'
                >
                  Brands options
                </Button>
              </StyledLink>
            </main>

            <StyledLink to={props.api.settingsPage}>
              <Button
                className='back__btn'
                color='red'
              >
                Back
              </Button>
            </StyledLink>
          </div>
        </div>
      </div>
    );
  }
}

export default FilamentsOptions;
