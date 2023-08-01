// libs
import React from 'react';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

function ColorFilter(props) {
  return (
    <SelectBox>
      <div className='SelectBox_border-gradient'>
        <label htmlFor='colors'>Color</label>
        <select
          name='colors'
          value={props.selected}
          // onChange={dropdownChangeHandler}
        >
          <option
            key='all-colors'
            value='all'
          >
            All
          </option>
          {/* {colors.map((material) => (
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

export default ColorFilter;
