// libs
import React, { ReactNode } from 'react';

// styled
import StyledButton from './StyledButton';
// import buttonColors from 'data/button-colors';

interface PrimaryButtonProps {
  children: ReactNode;
  styled?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  type: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  styled = 'default',
  type = 'button',
}) => {
  return (
    <StyledButton
      type={styled}
      htmlType={type}
    >
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
