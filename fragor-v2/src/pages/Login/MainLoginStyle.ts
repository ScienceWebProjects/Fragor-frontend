// libs
import styled from 'styled-components';

// utils
// import Colors from 'utils/colors';
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const MainLogin = styled.main`
  min-height: 70vh;
  width: 100%;

  position: relative;

  ${flexStyles({ direction: 'column', align: 'center', justify: 'center' })}

  @media (min-width: ${mediaBreakpoints.desctop}) {
    height: 90vh;
  }
`;

export default MainLogin;
