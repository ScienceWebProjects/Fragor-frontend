// libs
import React from 'react';

// hooks

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

function StockFilter(props) {
  const dropdownChangeHandler = (event) => {
    props.onStockFilter(event.target.value);
  };

  return (
    <SelectBox>
      <div className='SelectBox_border-gradient'>
        <label htmlFor='stock'>Stock</label>
        <select
          name='stock'
          value={props.selected}
          onChange={dropdownChangeHandler}
        >
          <option
            key='0-stock'
            value='0'
          >
            0 g
          </option>
          <option
            key='250-stock'
            value='250'
          >
            250 g
          </option>
          <option
            key='500-stock'
            value='500'
          >
            500 g
          </option>
          <option
            key='750-stock'
            value='750'
          >
            750 g
          </option>
          <option
            key='1000-stock'
            value='1000'
          >
            1000 g
          </option>
        </select>
      </div>
    </SelectBox>
  );
}

export default StockFilter;
