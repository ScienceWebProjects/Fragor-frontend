// libs
import React from 'react';
import { useState, useEffect } from 'react';

// components
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';
import PrinterDetails from './PrinterDetails';

// custom hooks
import useToken from '../../Hooks/useToken';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import PrinterItem from './PrinterItem';

// scss

function PrintersList(props) {
  const [printers, setPrinters] = useState([
    {
      id: 1,
      filaments: [
        {
          id: 3,
          amount: 0.123,
          type: 'PLA',
          printer: 1,
        },
        {
          id: 4,
          amount: 0.123,
          type: 'ABS',
          printer: 1,
        },
      ],
      device: {
        id: 2,
        ip: '123.456.789',
        port: 7654,
        printer: 1,
      },
      name: 'test',
      work_hours: 0.0,
      model: 'Ender 3',
      image: 'http://127.0.0.1:8000/media/images/printer.png',
    },
    {
      id: 2,
      filaments: [
        {
          id: 5,
          amount: 123232.13,
          type: 'PLA',
          printer: 2,
        },
        {
          id: 6,
          amount: 6.541,
          type: 'ABS',
          printer: 2,
        },
      ],
      device: null,
      name: 'ender 2',
      work_hours: 0.0,
      model: 'Ender 5',
      image: 'http://127.0.0.1:8000/media/images/printer.png',
    },
  ]);

  const user = useToken();

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `token ${user.token}`,
      },
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.printersList}`, requestOptions);

      if (response.status === 404) {
        console.log(`error ${response.status} fetch PrintersPage.js`);
        return;
      }

      const data = await response.json();
      setPrinters(data);
    } catch (e) {
      console.log('Error in try (catch) printer fetch');
      console.log(e);
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
