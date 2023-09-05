// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';
import PrinterEditBox from './Boxes/PrinterEditBox';
import DeleteBox from './Boxes/DeleteBox';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import iconImg from '../../Images/image-icon.png';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import '../_shared/UI/_details-buttons.scss';
import './scss/_details-printer.scss';
import StyledInput from '../UI/authorization/StyledInput';

function PrinterDetails(props) {
  const [details, setDetails] = useState(props.details);
  const [editBox, setEditBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);

  const user = useToken();

  useEffect(() => {
    const storedPrinter = sessionStorage.getItem('printerDetails');
    setDetails(JSON.parse(storedPrinter));
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

  const fileUploadApiCall = (file) => {
    console.log('Uploading file...');
    console.log(file);
    const API_ENDPOINT = `${props.api.ip}${props.api.printerImageSend_id}${details.id}/`;
    const request = new XMLHttpRequest();
    const formData = new FormData();

    request.open('POST', API_ENDPOINT, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
      }
    };
    formData.append('file', file);
    request.send(formData);
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    fileUploadApiCall(file);
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
            color='yellow'
            onClick={() => {
              setEditBox(true);
            }}
          >
            Edit
          </Button>
          <Button
            className='wrapper-btn'
            color='yellow'
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
        </div>

        <div className='details-printer'>
          <div className='printer-img'>
            {details.image ? (
              <img
                src={details.image}
                className='printer-img'
              />
            ) : (
              'No image added yet.'
            )}

            <button
              className='icon-btn'
              onClick={() => {
                document.getElementById('fileInput').click();
              }}
            >
              <img
                src={iconImg}
                className='icon-img'
              />
            </button>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={fileChangeHandler}
            />
          </div>

          <div>
            <InfiniteScroll
              dataLength={''}
              hasMore={false}
              height={'30vh'}
              // endMessage={'No more added filaments'}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div>Name: {details.name}</div>
              <div>Model: {details.model}</div>
              <br />
              <div>Work hours: {details.workHours} h</div>
              <br />
              <div>Printed Filements:</div>
              <div>All: {filamentAllAmount} kg</div>

              {Array.isArray(details.filaments) &&
                details.filaments.map((item, index) => (
                  <div key={index}>
                    {item.type}: {item.amount} kg
                  </div>
                ))}
            </InfiniteScroll>
          </div>
        </div>
        <StyledLink to={props.api.printersPage}>
          <Button
            className=''
            color='red'
          >
            Back
          </Button>
        </StyledLink>
      </main>

      {editBox && (
        <PrinterEditBox
          api={props.api}
          details={details}
          onPrinterEditBox={setEditBox}
        />
      )}
      {deleteBox && (
        <DeleteBox
          setDeleteBox={setDeleteBox}
          api={props.api}
          printerName={details.name}
          id={details.id}
        />
      )}
    </div>
  );
}

export default PrinterDetails;
