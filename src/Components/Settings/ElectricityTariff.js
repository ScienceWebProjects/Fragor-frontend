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

  // useState & useEffect
  // tariff should have attributes:
  // tariff id
  // tariff name
  // from (hour)
  // to (hour)
  // week days
  // price (kWh)
  // currency

  const [tariffs, setTariffs] = useState([
    {
      tarriffID: 1,
      name: 'Tarrif A1',
      weekDay: {
        monday: {
          from: 6,
          to: 21,
        },
        tuesday: {
          from: 6,
          to: 21,
        },
        Wednesday: {
          from: 6,
          to: 21,
        },
        Thursday: {
          from: 6,
          to: 21,
        },
        Friday: {
          from: 6,
          to: 21,
        },
        Saturday: null,
        Sunday: null,
      },
      price: 1.03,
    },
    {
      tarriffID: 2,
      name: 'Tarrif A2',
      weekDay: {
        monday: {
          from: 21,
          to: 6,
        },
        tuesday: {
          from: 21,
          to: 6,
        },
        Wednesday: {
          from: 21,
          to: 6,
        },
        Thursday: {
          from: 21,
          to: 6,
        },
        Friday: {
          from: 21,
          to: 24,
        },
        Saturday: 'allDay',
        Sunday: 'allDay',
      },
      price: 0.94,
    },
  ]);
  const [newTariff, setNewTariff] = useState({});

  const [isAdding, setIsAdding] = useState(false);

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
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.7}
          className='ininite-scroll'
        >
          <InfoType text={'Electricity tariff'} />

          {isAdding && (
            <NewTariff
              api={api}
              onNewTariff={setNewTariff}
              isAdding={setIsAdding}
            />
          )}
          <Button
            color='yellow'
            onClick={() => setIsAdding(true)}
          >
            Add new tariff
          </Button>
        </InfiniteScroll>
      </main>

      <StyledLink to={api.settingsPage}>
        <Button color='red'>Back</Button>
      </StyledLink>
    </div>
  );
}

export default ElectricityTariff;
