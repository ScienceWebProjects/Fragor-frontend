import React from 'react';

import PrimaryInputStyle from './PrimaryInputStyle';
import InputLabelStyle from '../InputLabelStyle';

import { InputProps } from 'utils/types';

interface PrimaryInputProps extends InputProps {
  label: string;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  onChange,
  label,
  id,
  type,
  placeholder,
  $isValid,
  required = false,
}) => {
  return (
    <>
      <InputLabelStyle>{label}</InputLabelStyle>
      <PrimaryInputStyle
        onChange={(text) => onChange(text)}
        id={id}
        type={type}
        placeholder={placeholder}
        $isValid={$isValid}
        required={required}
      />
    </>
  );
};

export default PrimaryInput;
