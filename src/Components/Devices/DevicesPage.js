// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import InfiniteScroll from 'react-infinite-scroll-component';
import DeleteBox from '../_shared/DeleteBox';
import AddDeviceBox from './Boxes/AddDeviceBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import InfoType from '../Authorization/Signin/UI/InfoType';

// scss
import './scss/_device_item.scss';
import './scss/_bottom_buttons.scss';

function DevicesPage(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  // variables for show devices
  const [devicesList, setDevicesList] = useState([
    {
      id: 0,
      name: 'A 07-23',
      model: 'FG-a1',
    },
    {
      id: 1,
      name: 'A 08-23',
      model: 'FG-a1',
    },
  ]);

  // variables for add device
  const [addDeviceBox, setAddDeviceBox] = useState(false);

  // variables for delete device
  const [device, setDevice] = useState({
    id: '',
    name: '',
    model: '',
  });
  const [deleteDeviceBox, setDeleteDeviceBox] = useState(false);

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
    devicesListApiCall();
  });

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar api={props.api} />
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
          <InfoType
            text={'Adding devices'}
            className=''
          />

          {devicesList.map((device) => (
            <div
              className='device_item'
              key={`device-${device.id}`}
            >
              <div className='item-name'>
                {device.name} | {device.model}
              </div>
              <Button
                className='item-btn'
                color='red'
                onClick={() => {
                  setDevice({
                    id: device.id,
                    name: device.name,
                    model: device.model,
                  });
                  setDeleteDeviceBox(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </InfiniteScroll>
      </main>

      <div className='bottom_buttons'>
        <Button
          className=''
          color='yellow'
          onClick={() => {
            setAddDeviceBox(true);
          }}
        >
          Add device
        </Button>

        <StyledLink to={props.api.home}>
          <Button
            className=''
            color='red'
          >
            Back
          </Button>
        </StyledLink>
      </div>

      {addDeviceBox && (
        <AddDeviceBox
          api={props.api}
          onAddDeviceBox={setAddDeviceBox}
        />
      )}

      {deleteDeviceBox && (
        <DeleteBox
          api={props.api}
          ID={device.id}
          endpoint={props.api.deviceDelete_id}
          deleteOption={`device ${device.name}`}
          onDeleteBox={setDeleteDeviceBox}
        />
      )}
    </div>
  );
}

export default DevicesPage;
