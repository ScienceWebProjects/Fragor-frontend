import styled from 'styled-components';

import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const PrintersCardsContainer = styled.div`
  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    width: 100%;
    height: 100%;

    margin: 0 3rem 0 3rem;

    ${flexStyles({
      direction: 'row',
      justify: 'space-between',
      align: 'flex-start',
      wrap: 'wrap',
    })}
  }
`;

export default PrintersCardsContainer;
