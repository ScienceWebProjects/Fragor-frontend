// libs
import styled from 'styled-components';

// components

// utils
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
import flexStyles from 'utils/flex-styles';

interface ButtonLangProps {}

const OptionLang = styled.div<ButtonLangProps>`
  ${flexStyles({ direction: 'row', justify: 'space-evenly', align: 'center' })}

  img {
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
  }
`;

export default OptionLang;
