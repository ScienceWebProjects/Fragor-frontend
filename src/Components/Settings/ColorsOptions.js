// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import DeleteBox from './Boxes/DeleteBox';
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';

// scss

function ColorsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [colorEntered, setColorEntered] = useState('');

  // properties for material delete
  const [colors, setColors] = useState([]);
  const [colorID, setColorID] = useState(0);
  const [deleteBox, setDeleteBox] = useState(false);

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
        `${props.api.ip}${props.api.filamentsColorsGet}`,
        requestOptions
      );

      const colorsList = await response.json();
      setColors(colorsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

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

          {colors.map((color) => (
            <div
              key={`material-${color.id}`}
              className='list-element'
            >
              <div className='element-label'>{color.color}</div>
              <Button
                color='red'
                className='element-delete'
                onClick={() => {
                  setColorID(color.id);
                  setDeleteBox(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </InfiniteScroll>
      </main>

      <StyledLink to={props.api.settingsFilamentsOptions}>
        <Button color='red'>Back</Button>
      </StyledLink>

      {deleteBox && (
        <DeleteBox
          api={props.api}
          ID={colorID}
          endpoint={props.api.settingFilamentColorDelete_id}
          deleteOption='color'
          onDeleteBox={setDeleteBox}
        />
      )}
    </div>
  );
}

export default ColorsOptions;
