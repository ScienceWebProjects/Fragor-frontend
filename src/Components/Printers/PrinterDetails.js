// libs
import React from 'react';
import { useState, useEffect } from 'react';

// hooks

// components
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// scss
import './UI/_details-buttons.scss';
import './UI/_details-printer.scss';

function PrinterDetails(props) {
  const [details, setDetails] = useState(props.details);

  useEffect(() => {
    if (!details) {
      const storedPrinter = sessionStorage.getItem('printerDetails');
      setDetails(JSON.parse(storedPrinter));
    }
  }, []);

  if (!details) {
    return <div>Brak wybranej drukarki.</div>;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <div className='buttons-wrapper'>
          <Button
            className='wrapper-btn'
            color='red'
          >
            Edit
          </Button>
          <Button
            className='wrapper-btn'
            color='red'
          >
            Add device
          </Button>
          <Button
            className='wrapper-btn'
            color='red'
          >
            Delete
          </Button>
        </div>

        <div className='details-printer'>
          <div className='printer-img'>
            {details.image ? <img src={details.image} /> : 'No image added yet.'}
          </div>

          <div className='printer-data'>
            <InfiniteScroll
              dataLength={''}
              hasMore={false}
              height={'30vh'}
              // endMessage={'No more added filaments'}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div>{details.name}</div>
              <div>{details.model}</div>
              <br />
              <div>Work hours: {details.work_hours} h</div>
              <br />
              <div>Printed Filements:</div>
              <div>All: ?? kg</div>

              {details.filaments.map((item, index) => (
                <div key={index}>
                  {item.type}: {item.amount} kg
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrinterDetails;
