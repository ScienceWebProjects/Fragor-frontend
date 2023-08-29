// libs

// hooks

// components
import TopBar from '../_shared/TopBar';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss

function OwnersPage(props) {
  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main></main>

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

export default OwnersPage;
