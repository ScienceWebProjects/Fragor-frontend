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

function BrandsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);

  const [brandEntered, setBrandEntered] = useState('');

  const brandAddHandler = async (e) => {
    e.preventDefault();

    const brandData = {
      brand: brandEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(brandData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingFilamentBrandAdd}`,
        requestOptions
      );

      if (response.status === 200) {
        return alert('Succesfully brand added.');
      }

      if (response.status === 404) {
        const res404 = await response.json();
        return res404.message ? alert(res404.message) : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add brand again.');
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
        <form onSubmit={brandAddHandler}>
          <StyledLabel htmlFor='brand-name'>Brand name</StyledLabel>
          <StyledInput
            name='brand-name'
            id='brand-name'
            type='text'
            value={brandEntered}
            onChange={(event) => {
              setBrandEntered(event.target.value);
            }}
            required
          />
          <Button
            className=''
            color='yellow'
            type='submit'
          >
            Add brand
          </Button>
        </form>
      </main>

      <StyledLink to={props.api.settingsFilamentsOptions}>
        <Button color='red'>Back</Button>
      </StyledLink>
    </div>
  );
}

export default BrandsOptions;
