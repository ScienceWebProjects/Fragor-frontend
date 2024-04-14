// libs
import React, { forwardRef } from 'react';
import PinField from 'react-pin-field';
import styled from 'styled-components';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';
import { PinInputProps } from 'utils/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledPinField = styled(PinField)`
  margin: 0.625rem 0;
  padding: 0.625rem;
  width: 15%;

  border-radius: 5px;
  border: 1px solid #000000;
  text-align: center;
  transition: 0.3s;

  &:focus {
    outline-offset: 2px;
  }
`;

interface PinInputStylesProps extends PinInputProps {
  validate: RegExp;
  onComplete: (pin: string) => void;
  type: 'password';
  required: boolean;
}

const PinInputStyle = forwardRef<HTMLInputElement[], PinInputStylesProps>(
  (props, ref) => (
    <StyledContainer>
      <StyledPinField
        ref={ref}
        {...props}
      />
    </StyledContainer>
  )
);

export default PinInputStyle;
