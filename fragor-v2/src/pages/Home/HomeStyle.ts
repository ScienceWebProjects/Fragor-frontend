// libs
import styled from 'styled-components';

// utils
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const HomeStyle = styled.div`
  min-height: 70vh;
  width: 100%;

  ${flexStyles({
    direction: 'column',
    justify: 'flex-start',
  })}

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    height: 90vh;

    ${flexStyles({
      direction: 'row',
    })}

    flex-wrap: wrap
  }
`;

export default HomeStyle;
