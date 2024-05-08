// libs
import styled from 'styled-components';

// utils
// import Colors from 'utils/colors';
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const MainLogin = styled.main`
  min-height: 70vh;
  width: 100%;

  position: relative;

  ${flexStyles({ direction: 'column', align: 'center', justify: 'center' })}

  & form {
    width: 80%;
  }

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    height: 90vh;

    & form {
      width: 70%;
    }
  }
`;

export default MainLogin;
