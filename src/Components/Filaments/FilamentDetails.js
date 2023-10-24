// libs

// hooks
import { useState, useEffect } from 'react';

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
  const [details, setDetails] = useState(props.details);
  const [editBox, setEditBox] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [notesBox, setNotesBox] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const storedFilament = sessionStorage.getItem('filamentDetails');
      setDetails(JSON.parse(storedFilament));
    }, 50);
  }, []);

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
            <div>Diameter: {details.diameter}</div>
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
