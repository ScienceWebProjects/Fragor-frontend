// libs
import React from 'react';
import axios from 'axios'; // v 1.5.0

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import { useIntl } from 'react-intl';

// components
import TopBar from '../_shared/TopBar';
import PrinterEditBox from './Boxes/PrinterEditBox';
// import DeleteBox from './Boxes/DeleteBox';
import { FormattedMessage } from 'react-intl';
import DeletePrinterBox from './Boxes/DeleteBox';
import NotesBox from '../_shared/NotesBox';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import '../../Fonts/fontello/css/fragor.css';
import iconImg from '../../Images/icon-black.png';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import '../_shared/UI/_details-buttons.scss';
import './scss/_details-printer.scss';

function PrinterDetails(props) {
  const [details, setDetails] = useState(props.details);
  const [editBox, setEditBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [notesBox, setNotesBox] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const user = useToken();
  const intl = useIntl();

  useEffect(() => {
    const storedPrinter = sessionStorage.getItem('printerDetails');
    setDetails(JSON.parse(storedPrinter));
  }, []);

  // sum all printed material filaments to one variable
  let filamentAllAmount = 0;
  let filamentAllPrice = 0;
  const filamentsAll = details ? details.filaments : null;
  for (const key in filamentsAll) {
    filamentAllAmount += filamentsAll[key].amount;
    filamentAllPrice += filamentsAll[key].price;
  }

  const deviceAddHandler = async () => {
    const btn = document.getElementById('deviceAddBtn');

    btn.textContent = intl.formatMessage({
      id: 'waiting',
      defaultMessage: 'Waiting...',
    });

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.deviceConnect}${details.id}/`,
        requestOptions
      );

      if (response.status === 201) {
        alert(
          intl.formatMessage({
            id: 'alert.addedDevice',
            defaultMessage: 'Succesfully added device.',
          })
        );

        btn.textContent = intl.formatMessage({
          id: 'addDevice',
          defaultMessage: 'Add device',
        });
      }

      if (response.status === 400) {
        const res = await response.json();
        console.log(res);
        btn.textContent = intl.formatMessage({
          id: 'addDevice',
          defaultMessage: 'Add device',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteButtonHandler = () => {
    setDeleteBox(true);
  };

  const fileChangeHandler = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    console.log(selectedFile);
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Nie wybrano pliku');
      return;
    }

    console.log('Uploading file...');
    const formData = new FormData();

    formData.append('name', details.name);
    formData.append('model', details.model);
    formData.append('image', selectedFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    try {
      const response = await axios.patch(
        `${props.api.ip}${props.api.printerImageAdd_id}${details.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Plik przesłany pomyślnie!', response.data);
        alert('Successfull image send!');
      }
    } catch (error) {
      console.error('Błąd przesyłania pliku', error);
    }
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
            <FormattedMessage
              id='edit'
              defaultMessage='Edit'
            />
          </Button>
          <Button
            className='wrapper-btn'
            color='yellow'
            onClick={deviceAddHandler}
            id='deviceAddBtn'
          >
            <FormattedMessage
              id='addDevice'
              defaultMessage='Add device'
            />
          </Button>
          <Button
            className='wrapper-btn'
            color='red'
            onClick={deleteButtonHandler}
          >
            <FormattedMessage
              id='delete'
              defaultMessage='Delete'
            />
          </Button>
        </div>

        <div className='details-printer'>
          <div className='printer-img'>
            {details.image ? (
              <img
                src={`${props.api.ip}${props.api.printerImageGet_id}${details.image}/`}
                className='img-img'
                alt='Printer'
              />
            ) : (
              'No image added yet.'
            )}

            <form
              encType='multipart/form-data'
              onSubmit={handleSubmit}
              className='form-new_image'
            >
              <button
                className='new_image-btn'
                type='button'
                onClick={() => {
                  document.getElementById('fileInput').click();
                }}
              >
                <img
                  src={iconImg}
                  className='btn-icon'
                  alt='new-img-button'
                />
              </button>

              <input
                type='file'
                name='file'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={fileChangeHandler}
              />
              <button
                type='submit'
                className='new_image-confirm'
              >
                Send
              </button>
            </form>
          </div>

          <div className='printer-info'>
            <button
              className='info-notes'
              type='button'
              onClick={() => {
                setNotesBox(true);
              }}
            >
              <i className='icon-edit-1'></i>
            </button>
            <InfiniteScroll
              dataLength={''}
              hasMore={false}
              height={'30vh'}
              // endMessage={'No more added filaments'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
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
                    {`${item.type}: ${item.amount} kg - ${item.price} PLN`}
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
            <FormattedMessage
              id='back'
              defaultMessage='Back'
            />
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
        <DeletePrinterBox
          setDeleteBox={setDeleteBox}
          api={props.api}
          printerName={details.name}
          id={details.id}
        />
      )}
      {notesBox && (
        <NotesBox
          api={props.api}
          object='printer'
          id={details.id}
          onNotesBox={setNotesBox}
        />
      )}
    </div>
  );
}

export default PrinterDetails;
