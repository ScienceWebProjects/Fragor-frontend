// libs

// hooks
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import useToken from '../../../Hooks/useToken';
import useWindowSize from '../../../Hooks/useWindowSize';

// components
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage } from 'react-intl';
import CustomError from '../../_shared/CustomError';

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledLabel from '../../UI/authorization/StyledLabel';
import StyledInput from '../../UI/authorization/StyledInput';
import CustomSelect from '../../_shared/CustomSelect';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_select--disabled.scss';
import '../scss/_filament-add-box.scss';

function FilamentAddBox(props) {
  const { onFilamentAddBox } = props;

  const user = useToken();
  const windowSize = useWindowSize();
  const intl = useIntl();

  // variables for filters
  const [filters, setFilters] = useState([]);
  const [devicesList, setDevicesList] = useState([
    {
      id: 0,
      name: 'test-name-1',
      model: 'test-model-1',
    },
    {
      id: 1,
      name: 'test-name-2',
      model: 'test-model-2',
    },
  ]);
  const [deviceSelected, setDeviceSelected] = useState('');
  const [materialSelected, setMaterialSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');

  // variables for new filament
  const [quantityEntered, setQuantityEntered] = useState('');
  const [diameterEntered, setDiameterEntered] = useState(1.75);
  const [priceEntered, setPriceEntered] = useState('');

  // custom error
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const filtersGetAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentsFiltersGet}`,
        requestOptions
      );

      const filtersList = await response.json();
      const filtersLists = {};

      for (const key in filtersList) {
        filtersLists[key] = filtersList[key].map((value, index) => ({
          id: index,
          name: value,
        }));
      }

      setFilters(filtersLists);

      console.log(filtersList);
    } catch (error) {
      console.log(error);
    }
  };

  const devicesListApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.devicesList}`,
        requestOptions
      );

      if (response.status === 200) {
        const responseData = await response.json();
        setDevicesList(responseData);
      }

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filtersGetAPICall();
    devicesListApiCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filamentAddApiCall = async () => {
    const addData = {
      device: deviceSelected,
      material: materialSelected,
      color: colorSelected,
      brand: brandSelected,
      diameter: diameterEntered,
      price: priceEntered,
      quantity: quantityEntered,
    };

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

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
        onFilamentAddBox(false);
        alert('Successfull add filament.');
        window.location.reload();
      }
      if (response.status === 400 || response.status === 404) {
        alert(response.message);
      }

      btn.textContent = 'Confirm';
    } catch (error) {
      console.log(error);
      alert('Somethint went bad.');
    }
  };

  const confirmAddSubmitHandler = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (deviceSelected === '') {
      newErrors.device = intl.formatMessage({
        id: 'errors.deviceSelected',
        defaultMessage: 'Adding device must be selected!',
      });
    }

    if (materialSelected === '') {
      newErrors.material = intl.formatMessage({
        id: 'errors.materialSelected',
        defaultMessage: 'Material must be selected!',
      });
    }

    if (colorSelected === '') {
      newErrors.color = intl.formatMessage({
        id: 'errors.colorSelected',
        defaultMessage: 'Color must be selected!',
      });
    }

    if (brandSelected === '') {
      newErrors.brand = intl.formatMessage({
        id: 'errors.brandSelected',
        defaultMessage: 'Brand must be selected!',
      });
    }

    if (quantityEntered <= 0) {
      newErrors.quantity = intl.formatMessage({
        id: 'errors.quantityEntered',
        defaultMessage: 'Quantity must be grater than 0!',
      });
    }

    if (diameterEntered <= 1) {
      newErrors.diameter = intl.formatMessage({
        id: 'errors.diameterEntered',
        defaultMessage: 'Diameter must be grater than 1!',
      });
    }

    if (priceEntered <= 0) {
      newErrors.diameter = intl.formatMessage({
        id: 'errors.priceEntered',
        defaultMessage: 'Price must be grater than 0!',
      });
    }

    setErrorMessage(
      `${newErrors.device ? newErrors.device + '\n' : ''}${
        newErrors.material ? newErrors.material + '\n' : ''
      }${newErrors.color ? newErrors.color + '\n' : ''}${
        newErrors.brand ? newErrors.brand + '\n' : ''
      }${newErrors.quantity ? newErrors.quantity + '\n' : ''}${
        newErrors.diameter ? newErrors.diameter + '\n' : ''
      }${newErrors.price ? newErrors.price + '\n' : ''}`
    );
    setIsError(true);

    if (Object.keys(newErrors).length === 0) {
      filamentAddApiCall();
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>
          <FormattedMessage
            id='filaments.addNewFilament'
            defaultMessage='Add new filament'
          />
        </h2>

        <InfiniteScroll
          className='form-filament-add'
          dataLength={1}
          hasMore={false}
          height={windowSize * 0.6}
        >
          <form onSubmit={confirmAddSubmitHandler}>
            <StyledLabel htmlFor='device-select'>
              <FormattedMessage
                id='filaments.device'
                defaultMessage='Adding device'
              />
            </StyledLabel>
            <CustomSelect
              options={devicesList || []}
              onCustomSelect={setDeviceSelected}
              labelKey='name'
              valueKey='id'
            />

            <StyledLabel htmlFor='material-select'>
              <FormattedMessage
                id='filaments.material'
                defaultMessage='Material'
              />
            </StyledLabel>
            <CustomSelect
              selectClass={deviceSelected ? '' : 'select-disabled'}
              options={filters.material || []}
              onCustomSelect={setMaterialSelected}
              labelKey='name'
              valueKey='name'
            />

            <StyledLabel htmlFor='color-select'>
              <FormattedMessage
                id='filaments.color'
                defaultMessage='Color'
              />
            </StyledLabel>
            <CustomSelect
              selectClass={deviceSelected ? '' : 'select-disabled'}
              options={filters.color || []}
              onCustomSelect={setColorSelected}
              labelKey='name'
              valueKey='name'
            />

            <StyledLabel htmlFor='brand-select'>
              <FormattedMessage
                id='filaments.brand'
                defaultMessage='Brand'
              />
            </StyledLabel>
            <CustomSelect
              selectClass={deviceSelected ? '' : 'select-disabled'}
              options={filters.brand || []}
              onCustomSelect={setBrandSelected}
              labelKey='name'
              valueKey='name'
            />

            <StyledLabel htmlFor='quantity-set'>
              <FormattedMessage
                id='filaments.quantity'
                defaultMessage='Quantity'
              />
              {' [g]'}
            </StyledLabel>
            <StyledInput
              name='quantity-set'
              id='quantity-set'
              type='number'
              min='1'
              max='5000'
              step='0.01'
              value={quantityEntered}
              onChange={(event) => {
                setQuantityEntered(event.target.value);
              }}
              isRequired={true}
            />

            <div className='number-inputs'>
              <div className='input-number'>
                <label
                  htmlFor='diameter'
                  className='input-label'
                >
                  <FormattedMessage
                    id='filaments.diameter'
                    defaultMessage='Diameter'
                  />
                </label>
                <StyledInput
                  name='diameter'
                  id='diameter'
                  type='number'
                  min='1'
                  max='4'
                  step='0.01'
                  value={diameterEntered}
                  onChange={(event) => {
                    setDiameterEntered(event.target.value);
                  }}
                  isRequired={true}
                />
              </div>

              <div className='input-number'>
                <label
                  htmlFor='price'
                  className='input-label'
                >
                  <FormattedMessage
                    id='filaments.pricePerKg'
                    defaultMessage='Price per 1 kg'
                  />
                </label>
                <StyledInput
                  name='price'
                  id='price'
                  type='number'
                  min='1'
                  step='0.01'
                  value={priceEntered}
                  onChange={(event) => {
                    setPriceEntered(event.target.value);
                  }}
                  isRequired={true}
                />
              </div>
            </div>

            <div className='box-btns'>
              <Button
                className='btns-btn'
                color='yellow'
                type='button'
                onClick={() => onFilamentAddBox(false)}
              >
                <FormattedMessage
                  id='back'
                  defaultMessage='Back'
                />
              </Button>
              <Button
                id='confirmBtn'
                className='btns-btn'
                color='green'
                type='submit'
              >
                <FormattedMessage
                  id='confirm'
                  defaultMessage='Confirm'
                />
              </Button>
            </div>
          </form>
        </InfiniteScroll>
      </div>

      {isError && (
        <CustomError
          message={errorMessage}
          onErrorBox={setIsError}
        />
      )}
    </div>
  );
}

export default FilamentAddBox;
