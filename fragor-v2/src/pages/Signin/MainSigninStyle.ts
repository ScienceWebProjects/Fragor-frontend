// libs
import styled from 'styled-components';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';
import Colors from 'utils/colors';

const MainSignin = styled.main`
  min-height: 60vh;
  width: 100%;

  ${flexStyles({ direction: 'column', align: 'center', justify: 'flex-start' })}

  // infinite-scroll
  & {
    width: 80%;
    margin: 1rem auto;
  }

  & .infinite-scroll-component {
    scrollbar-color: ${Colors.grey[300]} #00000000;
    scrollbar-width: none;
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
