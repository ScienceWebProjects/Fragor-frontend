// libs
import React from 'react';
import { useState, useEffect } from 'react';

// components
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
        Authorization: `token ${user.token}`,
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
        <Button
          className=''
          color='yellow'
        >
          Add Printer
        </Button>

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
            Back
          </Button>
        </StyledLink>
      </main>
    </div>
  );
}

export default PrintersList;
