// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import { useNavigate } from 'react-router-dom';

// components
import TopBar from '../_shared/TopBar';
import FilamentEditBox from './Boxes/FilamentEditBox';
import FilamentDeleteBox from './Boxes/FilamentDeleteBox';
import NotesBox from '../_shared/NotesBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import '../_shared/UI/_details-buttons.scss';
import './scss/_details-filament.scss';

function FilamentDetails(props) {
  const user = useToken();
  const navigate = useNavigate();

  const [details, setDetails] = useState(props.details);

  // variables for boxes
  const [editBox, setEditBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [notesBox, setNotesBox] = useState(false);

  // variables for error message
  // const [isError, setIsError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [errorCallback, setErrorCallback] = useState(() => {});

  useEffect(() => {
    setTimeout(() => {
      const storedFilament = sessionStorage.getItem('filamentDetails');
      setDetails(JSON.parse(storedFilament));
    }, 50);
  });

  const renewDelete = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentDelete_id}${props.details.id}/`,
        requestOptions
      );

      if (response.status === 204) {
        alert('Succesfull filament deleted for renew.');
      }

      if (response.status === 404) {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renewHandler = async () => {
    const addData = {
      material: details.material,
      color: details.color,
      brand: details.brand,
      diameter: details.diameter,
      price: details.price,
      uid: details.uid,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(addData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentAdd}`,
        requestOptions
      );

      if (response.status === 201) {
        renewDelete();
        alert('Successfull renew filament.');
        navigate(props.api.filamentsPage);
      }
      if (response.status === 400 || response.status === 404) {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Somethint went bad.');
    }
  };

  if (!details) {
    return <div>No filament selected.</div>;
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
            color='blue'
            onClick={() => renewHandler()}
          >
            Renew
          </Button>
          <Button
            className='wrapper-btn'
            color='red'
            onClick={() => {
              setDeleteBox(true);
            }}
          >
            Delete
          </Button>
        </div>

        <div className='details-filament'>
          <button
            className='info-notes'
            type='button'
            onClick={() => {
              setNotesBox(true);
            }}
          >
            <i className='icon-edit-1'></i>
          </button>

          <section className='filament-data'>
            <h3>Quantity: {details.quantity} g</h3>
            <div>Material: {details.material}</div>
            <div>Color: {details.color}</div>
            <div>Brand: {details.brand}</div>
            <div>Diameter: {details.diameter || 'No data.'}</div>
            <div>Price: {details.price || 'No data.'}</div>
          </section>
        </div>
      </main>

      <StyledLink to={props.api.filamentsPage}>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </StyledLink>

      {editBox && (
        <FilamentEditBox
          api={props.api}
          details={details}
          onFilamentEditBox={setEditBox}
        />
      )}
      {deleteBox && (
        <FilamentDeleteBox
          api={props.api}
          details={details}
          onFilamentDeleteBox={setDeleteBox}
        />
      )}
      {notesBox && (
        <NotesBox
          api={props.api}
          object='filament'
          id={details.id}
          onNotesBox={setNotesBox}
        />
      )}
    </div>
  );
}

export default FilamentDetails;
