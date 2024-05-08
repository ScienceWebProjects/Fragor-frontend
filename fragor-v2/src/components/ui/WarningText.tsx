import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Colors from 'utils/colors';
import { mediaBreakpointsStyle } from 'utils/media-breakpoints';

const WarningTextStyle = styled.h2`
  color: ${Colors.red[400]};

  font-size: 1rem;
  text-align: left;

  @media (min-width: ${mediaBreakpointsStyle.desctop}) {
    font-size: 1.125rem;
  }
`;

const WarningText = ({ children }: { children: ReactNode }) => {
  return <WarningTextStyle>{children}</WarningTextStyle>;
};

export default WarningText;
