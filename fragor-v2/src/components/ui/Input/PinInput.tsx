// libs
import React, { RefObject } from 'react';

// hooks

// components

// UI
import InputLabelStyle from './InputLabelStyle';
import PinInputStyle from './PinInputStyle';

// data

// utils
import { PinInputProps } from 'utils/types';

const PinRef: RefObject<HTMLInputElement[]> = React.createRef();

const PinInput: React.FC<PinInputProps> = ({
  label,
  length,
  $isValid,
  onPinEntered = () => {},
}) => {
  return (
    <>
      <InputLabelStyle>{label}</InputLabelStyle>
      <PinInputStyle
        ref={PinRef}
        length={length}
        validate={/^[0-9]$/}
        $isValid={$isValid}
        onComplete={(pin) => onPinEntered(pin)}
        type='password'
        required={true}
      />
    </>
  );
};

export default PinInput;
