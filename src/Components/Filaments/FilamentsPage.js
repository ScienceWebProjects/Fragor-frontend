// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';

// UI elements
import FiltersBar from './FiltersBar';
import FilamentsWindow from './UI/FilamentsWindow';
import FilamentsList from './FilamentsList';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_bottom-buttons.scss';

function FilamentsPage(props) {
  const user = useToken();
  const permission = usePermissions(user);

  const [filteredColor, setFilteredColor] = useState('all');
  const [filteredMaterial, setFilteredMaterial] = useState('all');
  const [filteredBrand, setFilteredBrand] = useState('FraGor');
  const [filteredStock, setFilteredStock] = useState('0');
  const [filaments, setFilaments] = useState([]);

  const filamentsRandomAddHandler = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentsRandomAdd_ammount}10/`,
        requestOptions
      );

      if (response.status === 404) {
        setFilaments([]);
        return;
      }

      if (response.status === 200) {
        window.location.reload();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filamentSelectionHandler = (filament) => {
    props.onFilamentSelect(filament);
  };

  const filterChangeHandler = (filters) => {
    const { color, material, brand, stock } = filters;
    setFilteredColor(color);
    setFilteredMaterial(material);
    setFilteredBrand(brand);
    setFilteredStock(stock);
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
        `${props.api.ip}${props.api.filamentsFiltered}${filteredColor}/${filteredMaterial}/${filteredStock}/`,
        // `${props.api.ip}${props.api.filamentsFiltered}${filteredColor}/${filteredMaterial}/${filteredBrand}/${filteredStock}/`,
        requestOptions
      );

      if (response.status === 404) {
        setFilaments([]);
        return;
      }

      const data = await response.json();
      // console.log(data);

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
        <FiltersBar
          api={props.api}
          onFilterChange={filterChangeHandler}
        />

        <FilamentsWindow>
          <FilamentsList
            items={filaments}
            api={props.api}
            onFilamentSelect={filamentSelectionHandler}
          />
        </FilamentsWindow>

        <div className='bottom-buttons'>
          <StyledLink to={props.api.home}>
            <Button
              className=''
              color='red'
            >
              Back
            </Button>
          </StyledLink>
          {permission.owner && (
            <Button
              className=''
              color='yellow'
              onClick={filamentsRandomAddHandler}
            >
              Random filaments add
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export default FilamentsPage;
