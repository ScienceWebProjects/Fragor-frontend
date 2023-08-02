// libs

// hooks
import { useState } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';

// UI elements
import InfoType from '../Authorization/Signin/UI/InfoType';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_add-printer.scss';

function AddPrinter(props) {
  const user = useToken();
  const permission = usePermissions(user);

  const [modelEntered, setModelEntered] = useState('');

  const printerModelAdd = async () => {
    if (modelEntered === '') {
      alert('You cannot add empty model name!');
      return;
    }

    const modelData = {
      model: modelEntered,
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
      const response = await fetch(`${props.api.ip}${props.api.printerModelAdd}`, requestOptions);

      if (response.status === 201) {
        alert('Succesfully added printer model');
      }

      if (response.status === 400) {
        const res400 = await response.json();
        alert(res400.message);
      }
    } catch (error) {
      console.log(error);
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
        {permission.master && (
          <div>
            <InfoType text={'Model'} />
            <StyledLabel htmlFor='printer-model-add'>Add printer model name</StyledLabel>
            <StyledInput
              name='printer-model-add'
              id='printer-model-add'
              type='text'
              value={modelEntered}
              onChange={(event) => {
                setModelEntered(event.target.value);
              }}
            />
            <Button
              className='add-btn'
              color='yellow'
              onClick={printerModelAdd}
            >
              Add model
            </Button>
          </div>
        )}
        <InfoType text={'Printer'} />
      </main>
    </div>
  );
}

export default AddPrinter;
