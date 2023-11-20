// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

function ColorFilter(props) {
  const user = useToken();

  const [colors, setColors] = useState([]);

  const dropdownChangeHandler = (event) => {
    props.onColorFilter(event.target.value);
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
        `${props.api.ip}${props.api.filamentsColorsGet}`,
        requestOptions
      );

      const colorsList = await response.json();
      setColors(colorsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  });

  return (
    <SelectBox>
      <div className='SelectBox_border-gradient'>
        <label htmlFor='colors'>Color</label>
        <select
          name='colors'
          value={props.selected}
          onChange={dropdownChangeHandler}
        >
          <option
            key='all-colors'
            value='all'
          >
            All
          </option>
          {colors.map((color, index) => (
            <option
              key={`color-${index}`}
              value={color.color}
            >
              {color.color}
            </option>
          ))}
        </select>
      </div>
    </SelectBox>
  );
}

export default ColorFilter;
