// libs
import styled from 'styled-components';

// utils
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const HomeContainer = styled.div`
  width: 90vw;
  min-height: 20vh;

  ${flexStyles({
    direction: 'column',
  })}

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    width: 45vw;
    height: 50%;
  }
`;

export default HomeContainer;
