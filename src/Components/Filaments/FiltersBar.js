// libs
import React from 'react';
import { useState } from 'react';

// components
import MaterialFilter from './filters/MaterialFilter';
import ColorFilter from './filters/ColorFilter';
import BrandFilter from './filters/BrandFilter';
import StockFilter from './filters/StockFilter';

// UI elements
import Card from '../UI/shared/Card';

// scss
import './scss/_bar-container.scss';

function FiltersBar(props) {
  const [filteredMaterial, setFilteredMaterial] = useState('all');

  //filters set
  const filterMaterialHandler = (selectedMaterial) => {
    setFilteredMaterial(selectedMaterial);
  };

  return (
    <div className='container_bar'>
      <MaterialFilter
        className='bar_filter'
        api={props.api}
        onMaterialFilter={''}
      />
      <ColorFilter />
      <BrandFilter />
      <StockFilter />
    </div>
  );
}

export default FiltersBar;
