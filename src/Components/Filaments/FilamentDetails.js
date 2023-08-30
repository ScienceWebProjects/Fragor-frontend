// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';
import FilamentEditBox from './Boxes/FilamentEditBox';
import FilamentDeleteBox from './Boxes/FilamentDeleteBox';

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

  const user = useToken();

  useEffect(() => {
    const storedFilament = sessionStorage.getItem('filamentDetails');
    setDetails(JSON.parse(storedFilament));
  }, []);

  // if (!details) {
  //   return <div>No filament selected.</div>;
  // }

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
          <section className='filament-data'>
            <div>Material: {details.material}</div>
            <div>Color: {details.color}</div>
            <div>Quantity: {details.quantity} g</div>
            <div>Brand: {details.brand}</div>
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
    </div>
  );
}

export default FilamentDetails;
