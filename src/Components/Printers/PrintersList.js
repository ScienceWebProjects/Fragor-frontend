// libs
import React from 'react';
import { useState, useEffect } from 'react';

// components
import { FormattedMessage } from 'react-intl';
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';

// custom hooks
import useToken from '../../Hooks/useToken';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import PrinterItem from './PrinterItem';

// scss

function PrintersList(props) {
  const [printers, setPrinters] = useState([]);

  const printerSelectionHandler = (printer) => {
    props.onPrinterSelect(printer);
  };

  const user = useToken();

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.printersList}`, requestOptions);

      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <StyledLink to={props.api.printerAddPage}>
          <Button
            className=''
            color='yellow'
          >
            <FormattedMessage
              id='printers.addprinter'
              defaultMessage='Add Printer'
            />
          </Button>
        </StyledLink>

        {printers.map((printer) => (
          <Button
            color='blue'
            key={printer.id}
          >
            <PrinterItem
              printer={printer}
              api={props.api}
              onPrinterSelect={printerSelectionHandler}
            />
          </Button>
        ))}
        <StyledLink to={props.api.home}>
          <Button
            className=''
            color='red'
          >
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
          </Button>
        </StyledLink>
      </main>
    </div>
  );
}

export default PrintersList;
