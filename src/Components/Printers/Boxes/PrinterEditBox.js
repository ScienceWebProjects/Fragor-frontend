// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// components
import CustomSelect from '../../_shared/CustomSelect';

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';

// scss
import '../../UI/shared/_box.scss';

function PrinterEditBox(props) {
  const { details, onPrinterEditBox } = props;

  const user = useToken();

  // variables for form
  const [models, setModels] = useState([]);

  // variables for input
  const [nameEntered, setNameEntered] = useState(details.name);
  const [modelSelected, setModelSelected] = useState(details.model);

  const confirmEditApiCall = async (e) => {
    e.preventDefault();

    const editData = {
      name: nameEntered,
      model: modelSelected,
    };

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(editData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printerEdit_id}${details.id}/`,
        requestOptions
      );

      if (response.status === 200) {
        onPrinterEditBox(false);
        alert('Successfull edit printer properties.');
        window.location.reload();
      }
      if (response.status === 400 || response.status === 404) {
        alert(response.message);
      }

      btn.textContent = 'Confirm';
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  };

  const modelsGetAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printersModelsGet}`,
        requestOptions
      );

      const modelsList = await response.json();
      const modelsNames = [];

      for (const element of modelsList) {
        modelsNames.push(element.model);
      }

      setModels(modelsNames);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    modelsGetAPICall();
  });

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Edit printer properties</h2>

        <form onSubmit={confirmEditApiCall}>
          <StyledLabel htmlFor='name'>Name</StyledLabel>
          <StyledInput
            name='name'
            id='name'
            type='text'
            value={nameEntered}
            onChange={(event) => {
              setNameEntered(event.target.value);
            }}
            required
          />

          <StyledLabel htmlFor='model-select'>Model</StyledLabel>
          <CustomSelect
            options={models}
            defaultSelected={details.model}
            onCustomSelect={setModelSelected}
          />

          <div className='box-btns'>
            <Button
              className='btns-btn'
              color='yellow'
              type='button'
              onClick={() => onPrinterEditBox(false)}
            >
              Back
            </Button>
            <Button
              id='confirmBtn'
              className='btns-btn'
              color='green'
              type='submit'
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrinterEditBox;
