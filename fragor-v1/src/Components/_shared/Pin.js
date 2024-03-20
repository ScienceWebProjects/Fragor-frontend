// libs
import React from 'react';
import PinField from 'react-pin-field';

const PinRef = React.createRef();

const Pin = (props) => {
  const { text, length, className, style, onPinEntered } = props;

  const handleComplete = (pin) => {
    onPinEntered(pin);
  };

  return (
    <div
      style={style}
      className={className}
    >
      <h2 className='pin_heading'>{text}</h2>
      <div className='pin_field'>
        <PinField
          ref={PinRef}
          length={length}
          validate={/^[0-9]$/}
          onComplete={handleComplete}
          className='field_input'
          type='password'
          required
        />
      </div>
    </div>
  );
};

export default Pin;
