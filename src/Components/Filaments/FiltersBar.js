// libs

// hooks
import { useState, useEffect } from 'react';

// components
import MaterialFilter from './filters/MaterialFilter';
import ColorFilter from './filters/ColorFilter';
import BrandFilter from './filters/BrandFilter';
import StockFilter from './filters/StockFilter';

// UI elements

// scss
import './scss/_bar-container.scss';

function FiltersBar(props) {
  const [color, setColor] = useState('all');
  const [material, setMaterial] = useState('all');
  const [brand, setBrand] = useState('all');
  const [stock, setStock] = useState('0');

  useEffect(() => {
    const filters = {
      color: color,
      material: material,
      brand: brand,
      stock: stock,
    };
    props.onFilterChange(filters);
  });

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
        onColorFilter={(color) => {
          setColor(color);
        }}
      />
      <BrandFilter
        className='bar_filter'
        api={props.api}
        onBrandFilter={(brand) => {
          setBrand(brand);
        }}
      />
      <StockFilter
        className='bar_filter'
        api={props.api}
        onStockFilter={(stock) => {
          setStock(stock);
        }}
      />
    </div>
  );
}

export default FiltersBar;
