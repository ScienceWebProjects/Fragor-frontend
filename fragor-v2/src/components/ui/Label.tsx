import React, { ReactNode } from 'react';
import styled from 'styled-components';

// import { mediaBreakpointsStyle } from 'utils/media-breakpoints';
// import flexStyles from 'utils/flex-styles';

const LabelWrapper = styled.div`
  width: 100%;
  margin: 1rem 0 1rem 0;

  display: flex;
  align-items: center;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: black;

  margin: 0 1rem 0 1rem;
`;

const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LabelWrapper>
      <Line />
      {children}
      <Line />
    </LabelWrapper>
  );
};

export default Label;
