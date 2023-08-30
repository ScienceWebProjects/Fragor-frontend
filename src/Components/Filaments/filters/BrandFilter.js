// libs
import React from 'react';

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../../Hooks/useToken';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

function BrandFilter(props) {
  const user = useToken();

  const [brands, setBrands] = useState([]);

  const dropdownChangeHandler = (event) => {
    props.onBrandFilter(event.target.value);
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
        `${props.api.ip}${props.api.filamentsBrandsGet}`,
        requestOptions
      );

      const brandsList = await response.json();
      setBrands(brandsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <SelectBox>
      <div className='SelectBox_border-gradient'>
        <label htmlFor='brands'>Brand</label>
        <select
          name='brands'
          value={props.selected}
          onChange={dropdownChangeHandler}
        >
          <option
            key='all-brands'
            value='all'
          >
            All
          </option>
          {brands.map((brand, index) => (
            <option
              key={`brand-${index}`}
              value={brand.name}
            >
              {brand.name}
            </option>
          ))}
        </select>
      </div>
    </SelectBox>
  );
}

export default BrandFilter;
