// libs
import React from 'react';

// components
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';

// UI elements
import StyledLink from '../UI/shared/StyledLink';

// scss

function PrintersList(props) {
  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <Button
          className=''
          color='yellow'
        >
          Add Printer
        </Button>

        <Button
          className=''
          color='blue'
        >
          Test printer btn
        </Button>
        <StyledLink to={props.api.home}>
          <Button
            className=''
            color='red'
          >
            Back
          </Button>
        </StyledLink>
      </main>
    </div>
  );
}

export default PrintersList;
