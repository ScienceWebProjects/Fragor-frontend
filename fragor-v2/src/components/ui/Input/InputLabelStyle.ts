// libs
import styled from 'styled-components';

// utils
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';

const InputLabelStyle = styled.h2`
  & {
    width: 100%;
    font-size: 1rem;
    text-align: left;
    font-weight: normal;
    margin: 0.625rem 0 0.125rem 0;

    @media (min-width: ${mediaBreakpointsStyle.desctop}) {
      font-size: 1.25rem;
    }
  }
`;

export default InputLabelStyle;
