// libs
import React from 'react';

// hooks

// components

// UI elements
import Button from '../UI/shared/buttons/Button';

// scss
import '../UI/shared/_box.scss';

function CustomError({ message, callback, onErrorBox }) {
  const formattedMessage = message.split('\n').map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Something went bad!</h2>
        <section style={{ lineHeight: 2 }}>{formattedMessage}</section>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => {
              onErrorBox(false);
              if (typeof callback === 'function') {
                callback();
              }
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomError;
