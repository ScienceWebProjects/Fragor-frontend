// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import InfiniteScroll from 'react-infinite-scroll-component'; // v6.1.0
import DeleteBox from '../_shared/DeleteBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';
import InfoType from '../Authorization/Signin/UI/InfoType';

// scss
import './scss/_filament-options.scss';
import './scss/_list-elements.scss';

function MaterialsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  // properties for material add
  const [materialNameEntered, setMaterialNameEntered] = useState('');
  const [minHotbedEntered, setMinHotbedEntered] = useState('');
  const [maxHotbedEntered, setMaxHotbedEntered] = useState('');
  const [minHotendEntered, setMinHotendEntered] = useState('');
  const [maxHotendEntered, setMaxHotendEntered] = useState('');
  const [densityEntered, setDensityEntered] = useState(1.0);
  const [diameterEntered, setDiameterEntered] = useState(1.75);

  // properties for material delete
  const [materials, setMaterials] = useState([]);
  const [materialID, setMaterialID] = useState(0);
  const [deleteBox, setDeleteBox] = useState(false);

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentsMaterialsGet}`,
        requestOptions
      );

      const materialsList = await response.json();
      setMaterials(materialsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  const materialAddHandler = async (e) => {
    e.preventDefault();

    const materialData = {
      material: materialNameEntered,
      hotbed: `${minHotbedEntered}-${maxHotbedEntered}`,
      hotend: `${minHotendEntered}-${maxHotendEntered}`,
      density: densityEntered,
      diameter: diameterEntered,
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

      if (response.status === 201) {
        alert('Succesfully material added.');
        window.location.reload();
      }

      if (response.status === 400) {
        const res404 = await response.json();
        return res404.message ? alert(res404.message) : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add material again.');
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
          <InfiniteScroll
            dataLength={''}
            hasMore={false}
            height={windowSize * 0.7}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '85vw',
              textAlign: 'center',
              alignItems: 'center',
              padding: '0px 15px 0 15px',
              margin: '10px',
            }}
          >
            <InfoType text={'Delete materials'} />

            {materials.map((material) => (
              <div
                key={`material-${material.id}`}
                className='list-element'
              >
                <div className='element-label'>{material.material}</div>
                <Button
                  color='red'
                  className='element-delete'
                  onClick={() => {
                    setMaterialID(material.id);
                    setDeleteBox(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}

            <InfoType text={'Add new material'} />

            <form
              onSubmit={materialAddHandler}
              className='filament-options'
            >
              {/* NAME INPUT */}
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
              {/* DENSITY & DIAMETER */}
              <div className='minMax-wrapper'>
                <div className='wrapper-min'>
                  <StyledLabel
                    htmlFor='density'
                    className='min-label'
                  >
                    Density
                  </StyledLabel>
                  <StyledInput
                    name='density'
                    id='density'
                    type='number'
                    min='0.0'
                    step='0.01'
                    value={densityEntered}
                    onChange={(event) => {
                      setDensityEntered(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className='wrapper-max'>
                  <StyledLabel
                    htmlFor='diameter'
                    className='max-label'
                  >
                    Diameter
                  </StyledLabel>
                  <StyledInput
                    name='diameter'
                    id='diameter'
                    type='number'
                    min='0.0'
                    step='0.01'
                    value={diameterEntered}
                    onChange={(event) => {
                      setDiameterEntered(event.target.value);
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
          </InfiniteScroll>
        </main>

        <StyledLink to={props.api.settingsFilamentsOptions}>
          <Button color='red'>Back</Button>
        </StyledLink>

        {deleteBox && (
          <DeleteBox
            api={props.api}
            ID={materialID}
            endpoint={props.api.settingFilamentMaterialDelete_id}
            deleteOption='material'
            onDeleteBox={setDeleteBox}
          />
        )}
      </div>
    );
  }
}

export default MaterialsOptions;
