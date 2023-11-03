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

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import InfoType from '../Authorization/Signin/UI/InfoType';

// scss
import './scss/_electricity-tariff.scss';
import NewTariff from './Boxes/NewTariff';

function ElectricityTariff({ api }) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [tariffs, setTariffs] = useState([
    {
      id: 1,
      name: 'Tarrif A1',
      hourFrom: 6,
      hourTo: 21,
      workingDays: true,
      weekend: false,
      price: 1.03,
    },
    {
      id: 2,
      name: 'Tarrif A2',
      hourFrom: 21,
      hourTo: 6,
      workingDays: false,
      weekend: true,
      price: 0.94,
    },
    {
      id: 3,
      name: 'Tarrif B3',
      hourFrom: 0,
      hourTo: 0,
      workingDays: true,
      weekend: true,
      price: 0.94,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const tariffsGetApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${api.ip}${api.settingTariffsGet}`,
        requestOptions
      );

      const tariffsList = await response.json();
      setTariffs(tariffsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tariffsGetApiCall();
  });

  if (permission.logged === 'logout') {
    return <LogoutUser api={api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <InfiniteScroll
          dataLength={tariffs.length}
          hasMore={true}
          height={windowSize * 0.7}
          className='ininite-scroll'
        >
          <InfoType text={'Electricity tariff'} />

          {tariffs.map((tariff, index) => (
            <div>
              {index === editingIndex ? (
                <NewTariff
                  api={api}
                  isAdding={() => setEditingIndex(-1)}
                  isEditing={setIsEditing}
                  isNew={false}
                  id={tariff.id}
                  name={tariff.name}
                  hourFrom={tariff.hourFrom}
                  hourTo={tariff.hourTo}
                  workingDays={tariff.workingDays}
                  weekend={tariff.weekend}
                  price={tariff.price}
                />
              ) : (
                <div className='tariff-details'>
                  <b className='name'>{tariff.name}</b>
                  <div className='hour'>Tariff hours</div>
                  <div className='hourFrom'>
                    {`From: ${
                      (tariff.hourFrom < 10 ? '0' : '') +
                      tariff.hourFrom +
                      ':00'
                    }`}
                  </div>
                  <div className='hourTo'>
                    {`To: ${
                      (tariff.hourTo < 10 ? '0' : '') + tariff.hourTo + ':00'
                    }`}
                  </div>
                  <div className='price'>
                    Tariff price: <b>{tariff.price}</b> PLN
                  </div>
                  <div className='days'>
                    <i>
                      <u>
                        {tariff.workingDays && tariff.weekend
                          ? 'All week'
                          : tariff.weekend
                          ? 'Weekend'
                          : tariff.workingDays
                          ? 'Working days'
                          : 'Error'}
                      </u>
                    </i>
                  </div>
                  <button
                    className='details-edit'
                    onClick={() => {
                      if (!isEditing) {
                        setEditingIndex(index);
                        setIsEditing(true);
                      } else {
                        alert('You editing tariff now!');
                      }
                    }}
                  >
                    <i className='icon-edit-1' />
                  </button>
                </div>
              )}
            </div>
          ))}

          {isAdding && (
            <NewTariff
              api={api}
              isAdding={setIsAdding}
              isEditing={setIsEditing}
              isNew={true}
            />
          )}
        </InfiniteScroll>
      </main>

      <div className='buttons-area'>
        <StyledLink to={api.settingsPage}>
          <Button
            color='red'
            className='area-btn'
          >
            Back
          </Button>
        </StyledLink>
        <Button
          className='area-btn'
          color='yellow'
          onClick={() => {
            if (!isEditing) {
              setTimeout(() => {
                const newTariffPanel = document.querySelector(
                  '#root > div > main > div > div > form > div.panel > div.panel-name'
                );

                newTariffPanel.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'nearest',
                });
              }, 10);
              setIsAdding(true);
              setIsEditing(true);
            } else {
              alert('You editing tariff now!');
            }
          }}
        >
          Add new tariff
        </Button>
      </div>
    </div>
  );
}

export default ElectricityTariff;
