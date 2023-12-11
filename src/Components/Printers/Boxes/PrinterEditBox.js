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

  const [printerPowerEntered, setPrinterPowerEntered] = useState(
    details.power || 0
  );

  const confirmEditApiCall = async (e) => {
    e.preventDefault();

    const editData = {
      id: details.id,
      name: nameEntered,
      model: modelSelected,
      power: printerPowerEntered,
    };

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    console.log('Edit data:', editData);

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
        `${props.api.ip}${props.api.printerEdit_id}`,
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
      btn.textContent = 'Confirm';
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
      setModels(modelsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    modelsGetAPICall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            labelKey='model'
            valueKey='model'
          />

          <StyledLabel htmlFor='model-select'>Power</StyledLabel>
          <StyledInput
            className='printer-power'
            name='printer-power'
            id='printer-power'
            type='number'
            min={0}
            step={1}
            value={printerPowerEntered === 0 ? '' : printerPowerEntered}
            placeholder='Power [W]'
            onChange={(event) => {
              setPrinterPowerEntered(event.target.value);
            }}
          />
          {printerPowerEntered <= 0 && (
            <h4 className='printer-power-warning__box'>
              No Providing the printer power value may result in errors in the
              calculation of material consumption costs.
            </h4>
          )}

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
