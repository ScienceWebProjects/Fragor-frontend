// libs
import React, { ReactNode } from 'react';

// styled
import StyledButton from './StyledButton';

import { ButtonColors } from 'utils/types';
import buttonColors from 'utils/button-colors';

export interface PrimaryButtonProps {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  colorBtn?: ButtonColors;
  style?: React.CSSProperties;
  antType?: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  type = 'button',
  style,
  colorBtn = buttonColors.blue,
  antType = 'primary',
  onClick,
}) => {
  return (
    <StyledButton
      htmlType={type}
      onClick={onClick}
      $colorBtn={colorBtn}
      type={antType}
      style={style}
    >
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
