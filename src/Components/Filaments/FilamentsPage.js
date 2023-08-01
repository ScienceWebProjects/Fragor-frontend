// libs
import React from 'react';
import { useState, useEffect } from 'react';

// components
import TopBar from '../_shared/TopBar';

// UI elements
import FiltersBar from './FiltersBar';
import FilamentsWindow from './UI/FilamentsWindow';
import FilamentsList from './FilamentsList';

function FilamentsPage(props) {
  const [filaments, setFilaments] = useState([
    {
      id: '1',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '2',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '3',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '4',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '5',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '6',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '7',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '8',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '9',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '10',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '11',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '12',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '13',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '14',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '15',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '16',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '17',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
    {
      id: '18',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '19',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '20',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
  ]);

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `token ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        // `${props.api.ip}${props.api.filterFilament}${filteredColor}/${filteredMaterial}/${filteredStock}/`,
        requestOptions
      );

      if (response.status === 404) {
        setFilaments([]);
        return;
      }

      const data = await response.json();
      console.log(data);

      setFilaments(data);
    } catch (e) {
      console.log('Error in filter fetch');
    }
  };

  useEffect(() => {
    makeAPICall();
    // }, [filteredMaterial, filteredColor, filteredBrand, filteredStock]);
  }, []);

  const filteredFilaments = filaments;

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <FiltersBar />

        <FilamentsWindow>
          <FilamentsList items={filteredFilaments} />
        </FilamentsWindow>
      </main>
    </div>
  );
}

export default FilamentsPage;
