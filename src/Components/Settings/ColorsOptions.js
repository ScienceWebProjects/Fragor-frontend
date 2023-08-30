// libs

// hooks
import { useState } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';

// scss

function ColorsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);

  const [colorEntered, setColorEntered] = useState('');

  const colorAddHandler = async (e) => {
    e.preventDefault();

    const colorData = {
      color: colorEntered.toUpperCase(),
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(colorData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingFilamentColorAdd}`,
        requestOptions
      );

      if (response.status === 201) {
        return alert('Succesfully color added.');
      }

      if (response.status === 400) {
        const res404 = await response.json();
        return res404.message ? alert(res404.message) : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add color again.');
      alert(error);
    }
  };

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <form onSubmit={colorAddHandler}>
          <StyledLabel htmlFor='color-name'>Color name</StyledLabel>
          <StyledInput
            name='color-name'
            id='color-name'
            type='text'
            value={colorEntered}
            onChange={(event) => {
              setColorEntered(event.target.value);
            }}
            required
          />
          <Button
            className=''
            color='yellow'
            type='submit'
          >
            Add color
          </Button>
        </form>
      </main>

      <StyledLink to={props.api.settingsFilamentsOptions}>
        <Button color='red'>Back</Button>
      </StyledLink>
    </div>
  );
}

export default ColorsOptions;
