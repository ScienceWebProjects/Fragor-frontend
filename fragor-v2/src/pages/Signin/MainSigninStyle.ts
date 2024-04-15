// libs
import styled from 'styled-components';

// utils
// import Colors from 'utils/colors';
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const MainSignin = styled.main`
  min-height: 60vh;
  width: 100%;

  ${flexStyles({ direction: 'column', align: 'center', justify: 'flex-start' })}

  // infinite-scroll
  & {
    width: 80%;
    margin: 1rem auto;
  }

  @media (min-width: ${mediaBreakpoints.desctop}) {
    height: 90vh;
    min-height: 60vh;
    justify-content: center;

    & {
      width: 30%;
      margin: 0 auto;
    }
  }
`;

export default MainSignin;
