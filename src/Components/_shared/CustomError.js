// libs
import React from 'react';

// hooks
import { useIntl } from 'react-intl';

// components
import { FormattedMessage } from 'react-intl';

// UI elements
import Button from '../UI/shared/buttons/Button';

// scss
import '../UI/shared/_box.scss';

function CustomError({ message, callback, onErrorBox }) {
  const intl = useIntl();

  const formattedMessage = message.split('\n').map((item, index) => (
    <React.Fragment key={index}>
      {item}
      <br />
    </React.Fragment>
  ));

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>
          {intl.formatMessage({
            id: 'errors.message',
            defaultMessage: 'Something went bad!',
          })}
        </h2>
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
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomError;
