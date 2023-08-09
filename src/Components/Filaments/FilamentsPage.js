// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';

// UI elements
import FiltersBar from './FiltersBar';
import FilamentsWindow from './UI/FilamentsWindow';
import FilamentsList from './FilamentsList';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

function FilamentsPage(props) {
  const user = useToken();

  const [filteredColor, setFilteredColor] = useState('all');
  const [filteredMaterial, setFilteredMaterial] = useState('all');
  const [filteredBrand, setFilteredBrand] = useState('FraGor');
  const [filteredStock, setFilteredStock] = useState('0');
  const [filaments, setFilaments] = useState([]);

  const filamentSelectionHandler = (filament) => {
    props.onFilamentSelect(filament);
  };

  const filterChangeHandler = (filters) => {
    const { color, material, brand, stock } = filters;
    setFilteredColor(color);
    setFilteredMaterial(material);
    setFilteredBrand(brand);
    setFilteredStock(stock);
    console.log(filters);
  };

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentsFiltered}${filteredColor}/${filteredMaterial}/${filteredStock}/`,
        // `${props.api.ip}${props.api.filamentsFiltered}${filteredColor}/${filteredMaterial}/${filteredBrand}/${filteredStock}/`,
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
  }, [filteredMaterial, filteredColor, filteredBrand, filteredStock]);

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <FiltersBar onFilterChange={filterChangeHandler} />

        <FilamentsWindow>
          <FilamentsList
            items={filaments}
            api={props.api}
            onFilamentSelect={filamentSelectionHandler}
          />
        </FilamentsWindow>
        <StyledLink to={props.api.home}>
          <Button
            className=''
            color='red'
          >
            Back
          </Button>
        </StyledLink>
      </main>
    </div>
  );
}

export default FilamentsPage;
