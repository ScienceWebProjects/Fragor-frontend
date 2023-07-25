// libs
import React from 'react';
import PinField from 'react-pin-field';

const PinRef = React.createRef();

const Pin = () => {
  const handleComplete = (pin) => {
    console.log('Entered PIN:', pin);
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
        />
      </div>
    </div>
  );
};

export default Pin;
