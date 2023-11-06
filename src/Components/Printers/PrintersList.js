// libs
import React from 'react';
import { useState, useEffect } from 'react';

// hooks
import useToken from '../../Hooks/useToken';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import PrinterItem from './PrinterItem';
import InfiniteScroll from 'react-infinite-scroll-component';

// scss

function PrintersList(props) {
  const windowSize = useWindowSize();

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
      const response = await fetch(
        `${props.api.ip}${props.api.printersList}`,
        requestOptions
      );

      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeAPICall();
  });

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
            Add Printer
          </Button>
        </StyledLink>

        <InfiniteScroll
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.6}
        >
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
        </InfiniteScroll>
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
