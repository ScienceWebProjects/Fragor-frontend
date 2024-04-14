// libs
import React from 'react';

// hooks

// components
import PrimaryInputStyle from './PrimaryInputStyle';
import InputLabelStyle from './InputLabelStyle';

// data

// utils
import { InputProps } from 'utils/types';

interface PrimaryInputProps extends InputProps {
  label: string;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  onChange,
  label,
  placeholder,
  $isValid,
  required = false,
}) => {
  console.log($isValid);
  return (
    <>
      <InputLabelStyle>{label}</InputLabelStyle>
      <PrimaryInputStyle
        onChange={(text) => onChange(text)}
        placeholder={placeholder}
        $isValid={$isValid}
        required={required}
      />
    </>
  );
};

export default PrimaryInput;
