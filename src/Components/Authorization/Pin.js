// libs
import React from 'react';
import PinField from 'react-pin-field';

const PinRef = React.createRef();

const Pin = (props) => {
  const handleComplete = (pin) => {
    props.onPinEntered(pin);
  };

  return (
    <div style={{ width: '85%', margin: '0 auto' }}>
      <h2 className='pin_heading'>PIN</h2>
      <div className='pin_field'>
        <PinField
          ref={PinRef}
          length={4}
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
