// libs
import styled from 'styled-components';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const AdidionalBtsWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 0;

  ${flexStyles({
    direction: 'column',
    align: 'flex-start',
    justify: 'flex-start',
  })}

  @media (min-width: ${mediaBreakpoints.desctop}) {
    bottom: 2rem;
    right: 2rem;
  }
`;

export default AdidionalBtsWrapper;
