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
import InfoType from '../Authorization/Signin/UI/InfoType';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';

// scss
import './scss/_filament-options.scss';

function FilamentsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);

  const [materialNameEntered, setMaterialNameEntered] = useState('');
  const [minHotbedEntered, setMinHotbedEntered] = useState('');
  const [maxHotbedEntered, setMaxHotbedEntered] = useState('');
  const [minHotendEntered, setMinHotendEntered] = useState('');
  const [maxHotendEntered, setMaxHotendEntered] = useState('');
  const [colorEntered, setColorEntered] = useState('');
  const [brandEntered, setBrandEntered] = useState('');

  const materialAddHandler = async () => {
    const materialData = {
      material: materialNameEntered,
      hotbed: `${minHotbedEntered}-${maxHotbedEntered}`,
      hotend: `${minHotendEntered}-${maxHotendEntered}`,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(materialData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingFilamentMaterialAdd}`,
        requestOptions
      );

      if (response.status === 200) {
        return alert('Succesfully material added.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add material again.');
    }
  };

  const colorAddHandler = async () => {
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

      if (response.status === 404) {
        const res404 = await response.json();
        return res404.message ? alert(res404.message) : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add color again.');
      alert(error);
    }
  };

  const brandAddHandler = async () => {
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

  if (permission.logged === 'logged') {
    return (
      <div>
        {/* <header> */}
        <TopBar />
        {/* </ header> */}

        <main className='App-header'>
          {permission.owner && (
            <form
              onSubmit={materialAddHandler}
              className='filament-options'
            >
              {/* MATERIAL INPUT */}
              <InfoType text={'Material'} />
              <StyledLabel htmlFor='material-name'>Material name</StyledLabel>
              <StyledInput
                name='material-name'
                id='material-name'
                type='text'
                value={materialNameEntered}
                onChange={(event) => {
                  setMaterialNameEntered(event.target.value);
                }}
                required
              />

              {/* HOTBED INPUT */}
              <div className='minMax-wrapper'>
                <div className='wrapper-min'>
                  <StyledLabel
                    htmlFor='min-hotbed-temperature'
                    className='min-label'
                  >
                    Min hotbed temp
                  </StyledLabel>
                  <StyledInput
                    name='min-hotbed-temperatures'
                    id='min-hotbed-temperatures'
                    type='number'
                    min='0'
                    value={minHotbedEntered}
                    onChange={(event) => {
                      setMinHotbedEntered(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className='wrapper-max'>
                  <StyledLabel
                    htmlFor='max-hotbed-temperature'
                    className='max-label'
                  >
                    Max hotbed temp
                  </StyledLabel>
                  <StyledInput
                    name='max-hotbed-temperatures'
                    id='max-hotbed-temperatures'
                    type='number'
                    max='100'
                    value={maxHotbedEntered}
                    onChange={(event) => {
                      setMaxHotbedEntered(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              {/* HOTEND INPUT */}
              <div className='minMax-wrapper'>
                <div className='wrapper-min'>
                  <StyledLabel
                    htmlFor='min-hotend-temperature'
                    className='min-label'
                  >
                    Min hotend temp
                  </StyledLabel>
                  <StyledInput
                    name='min-hotend-temperatures'
                    id='min-hotend-temperatures'
                    type='number'
                    min='150'
                    value={minHotendEntered}
                    onChange={(event) => {
                      setMinHotendEntered(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className='wrapper-max'>
                  <StyledLabel
                    htmlFor='max-hotend-temperature'
                    className='max-label'
                  >
                    Max hotend temp
                  </StyledLabel>
                  <StyledInput
                    name='max-hotend-temperatures'
                    id='max-hotend-temperatures'
                    type='number'
                    max='350'
                    value={maxHotendEntered}
                    onChange={(event) => {
                      setMaxHotendEntered(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <Button
                className=''
                color='yellow'
                type='submit'
              >
                Add mateial
              </Button>
            </form>
          )}

          <form onSubmit={colorAddHandler}>
            <InfoType text={'Color'} />
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

          <form onSubmit={brandAddHandler}>
            <InfoType text={'Brand'} />
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

        <StyledLink to={props.api.settingsPage}>
          <Button color='red'>Back</Button>
        </StyledLink>
      </div>
    );
  }
}

export default FilamentsOptions;
