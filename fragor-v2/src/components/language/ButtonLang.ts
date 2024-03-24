// libs
import styled from 'styled-components';

// components
import { Dropdown } from 'antd';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

const ButtonLang = styled(Dropdown)`
  width: 8rem;
  color: black;

  ${flexStyles({ direction: 'row', justify: 'space-evenly', align: 'center' })}

  position: absolute;
  top: 5vh;
  right: 0rem;

  img {
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: ${mediaBreakpoints.desctop}) {
    top: 7vh;
    right: 4rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export default ButtonLang;
