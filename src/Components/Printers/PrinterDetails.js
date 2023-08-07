// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// scss
import './scss/_details-buttons.scss';
import './scss/_details-printer.scss';
import DeleteBox from './DeleteBox';

function PrinterDetails(props) {
  const [details, setDetails] = useState(props.details);
  const [deleteBox, setDeleteBox] = useState(false);

  const user = useToken();

  useEffect(() => {
    if (!details) {
      const storedPrinter = sessionStorage.getItem('printerDetails');
      setDetails(JSON.parse(storedPrinter));
    }
  }, []);

  // sum all printed material filaments to one variable
  let filamentAllAmount = 0;
  const filamentsAll = details ? details.filaments : '';
  for (const key in filamentsAll) {
    filamentAllAmount += filamentsAll[key].amount;
  }

  const deviceAddHandler = async () => {
    const btn = document.getElementById('deviceAddBtn');

    btn.textContent = 'Waiting...';

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.deviceAdd}${details.id}/`,
        requestOptions
      );

      if (response.status === 201) {
        alert('Succesfully added device.');
        btn.textContent = 'Add device';
      }

      if (response.status === 400) {
        const res = await response.json();
        console.log(res);
        btn.textContent = 'Add device';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteButtonHandler = () => {
    setDeleteBox(true);
  };

  if (!details) {
    return <div>No printer selected.</div>;
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
            onClick={deviceAddHandler}
            id='deviceAddBtn'
          >
            Add device
          </Button>
          <Button
            className='wrapper-btn'
            color='red'
            onClick={deleteButtonHandler}
          >
            Delete
          </Button>
          {deleteBox && (
            <DeleteBox
              setDeleteBox={setDeleteBox}
              api={props.api}
              printerName={details.name}
              id={details.id}
            />
          )}
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
              <div>Name: {details.name}</div>
              <div>Model: {details.printerModel.model}</div>
              <br />
              <div>Work hours: {details.workHours} h</div>
              <br />
              <div>Printed Filements:</div>
              <div>All: {filamentAllAmount} kg</div>

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
