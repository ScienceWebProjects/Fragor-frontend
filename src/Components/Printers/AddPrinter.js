// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import DeleteBox from '../_shared/DeleteBox';
import CustomError from '../_shared/CustomError';
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import InfoType from '../Authorization/Signin/UI/InfoType';
import StyledInput from '../UI/authorization/StyledInput';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_add-printer.scss';

function AddPrinter(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCallback, setErrorCallback] = useState(() => {});

  // variables for model
  const [modelEntered, setModelEntered] = useState('');
  const [modelAdd, setModelAdd] = useState('');
  const [modelDelete, setModelDelete] = useState('');
  const [deleteBox, setDeleteBox] = useState(false);

  // variables for printer
  const [printerNameEntered, setPrinterNameEntered] = useState('');
  const [printersModels, setPrintersModels] = useState([]);
  const [printerPowerEntered, setPrinterPowerEntered] = useState(0);

  const getAddedPrinter = async () => {
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

      const data = await response.json();
      setPrintersModels(data);
      setModelAdd(data[0].model);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddedPrinter();
  });

  const printerModelAddHandler = async () => {
    if (modelEntered.trim() === '') {
      setErrorMessage('You cannot add empty model name!');
      setIsError(true);
      return;
    }

    const modelData = {
      model: modelEntered,
      power: printerPowerEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(modelData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printerModelAdd}`,
        requestOptions
      );

      if (response.status === 201) {
        setErrorMessage('Succesfully added printer model');
        setIsError(true);
        setErrorCallback(() => {
          return () => {
            window.location.reload();
          };
        });
      }

      if (response.status === 400) {
        const res400 = await response.json();
        setErrorMessage(res400.message);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const printerAddHandler = async () => {
    if (printerNameEntered === '' || modelAdd === '') {
      setErrorMessage('Name or model cannot be empty!');
      setIsError(true);
    }

    const printerData = {
      name: printerNameEntered,
      model: modelAdd,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(printerData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printerAdd}`,
        requestOptions
      );

      if (response.status === 201) {
        setErrorMessage('Succesfully printer added.');
        setIsError(true);
      }

      if (response.status === 400) {
        const res400 = await response.json();
        setErrorMessage(res400.message);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        'Post error! Failed attempt to add printer. Refresh page and try again.'
      );
      setIsError(true);
    }
  };

  if (permission.logged === 'logout') {
    return <LogoutUser />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header add-printer'>
        <InfiniteScroll
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.7}
        >
          {(permission.owner || permission.master) && (
            <div>
              <InfoType text={'Model'} />

              <StyledInput
                name='printer-model-add'
                id='printer-model-add'
                type='text'
                placeholder='Add printer model name'
                value={modelEntered}
                onChange={(event) => {
                  setModelEntered(event.target.value);
                }}
              />
              <StyledInput
                name='printer-power'
                id='printer-power'
                type='number'
                min={0}
                step={1}
                value={printerPowerEntered === 0 ? '' : printerPowerEntered}
                placeholder='Printer power'
                onChange={(event) => {
                  setPrinterPowerEntered(event.target.value);
                }}
              />
              {printerPowerEntered <= 0 && (
                <h4 className='printer-power-warning'>
                  No Providing the printer power value may result in errors in
                  the calculation of material consumption costs.
                </h4>
              )}
              <Button
                className='add-btn'
                color='yellow'
                onClick={printerModelAddHandler}
              >
                Add model
              </Button>

              <div className='delete_model-select'>
                <select
                  className='select-dropdown'
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    const [id, model] = selectedValue.split(',');
                    setModelDelete({ id: id, model: model });
                  }}
                >
                  <option
                    value={''}
                    select='true'
                    hidden
                  >
                    Model...
                  </option>
                  {printersModels.map((model) => (
                    <option
                      key={model.id}
                      value={`${model.id},${model.model}`}
                    >
                      {model.model}
                    </option>
                  ))}
                </select>

                <Button
                  className={`select-btn ${
                    modelDelete.model ? '' : 'delete-inactive'
                  }`}
                  color='red'
                  onClick={() => {
                    setDeleteBox(true);
                  }}
                >
                  Delete model
                </Button>
              </div>
            </div>
          )}
          <InfoType text={'Printer'} />
          <div className='printer-add-input'>
            <div className='add-input'>
              <StyledInput
                name='printer-add'
                id='printer-add'
                type='text'
                value={printerNameEntered}
                placeholder='Printer name'
                onChange={(event) => {
                  setPrinterNameEntered(event.target.value);
                }}
              />
            </div>
            <select
              className='add-select'
              onChange={(event) => {
                console.log(modelAdd);
                setModelAdd(event.target.value);
              }}
            >
              {printersModels.map((model) => (
                <option
                  key={model.id}
                  value={model.model}
                >
                  {model.model}
                </option>
              ))}
            </select>
          </div>

          <Button
            className='add-btn'
            color='yellow'
            onClick={printerAddHandler}
          >
            Add printer
          </Button>
        </InfiniteScroll>
      </main>

      <StyledLink to={props.api.printersPage}>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </StyledLink>

      {deleteBox && (
        <DeleteBox
          api={props.api}
          ID={modelDelete.id}
          endpoint={props.api.printerModelDelete_id}
          deleteOption={`model ${modelDelete.model}`}
          onDeleteBox={setDeleteBox}
        />
      )}

      {isError && (
        <CustomError
          message={errorMessage}
          callback={errorCallback}
          onErrorBox={setIsError}
        />
      )}
    </div>
  );
}

export default AddPrinter;
