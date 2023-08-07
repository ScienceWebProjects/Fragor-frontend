// libs

// hooks
import { useState, useEffect } from 'react';

// components
import MaterialFilter from './filters/MaterialFilter';
import ColorFilter from './filters/ColorFilter';
import BrandFilter from './filters/BrandFilter';
import StockFilter from './filters/StockFilter';
import FiltersDropdownMenu from './filters/FiltersDropdownMenu';

// UI elements
// import Card from '../UI/shared/Card';

// scss
import './scss/_bar-container.scss';

function FiltersBar(props) {
  const [color, setColor] = useState('all');
  const [material, setMaterial] = useState('all');
  const [brand, setBrand] = useState('all');
  const [stock, setStock] = useState('0');

  useEffect(() => {
    props.onFilterChange = {
      color: color,
      material: material,
      brand: brand,
      stock: stock,
    };
  }, [color, material, brand, stock]);

  return (
    <div className='container_bar'>
      <MaterialFilter
        className='bar_filter'
        api={props.api}
        onMaterialFilter={(material) => {
          setMaterial(material);
        }}
      />
      <ColorFilter
        className='bar_filter'
        api={props.api}
      />
      <BrandFilter
        className='bar_filter'
        api={props.api}
      />
      <StockFilter
        className='bar_filter'
        api={props.api}
      />
      <FiltersDropdownMenu />
    </div>
  );
}

export default FiltersBar;
