// libs
import React from 'react';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

function BrandFilter(props) {
  return (
    <SelectBox>
      <div className='SelectBox_border-gradient'>
        <label htmlFor='brands'>Brand</label>
        <select
          name='brands'
          value={props.selected}
          // onChange={dropdownChangeHandler}
        >
          <option
            key='all-brands'
            value='all'
          >
            All
          </option>
          {/* {brands.map((material) => (
          <option
            key={material.id}
            value={material.type}
          >
            {material.type}
          </option>
        ))} */}
        </select>
      </div>
    </SelectBox>
  );
}

export default BrandFilter;
