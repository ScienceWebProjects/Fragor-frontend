// libs
import React from 'react';
import { useState, useEffect } from 'react';

// custom hooks
// import useToken from '../../Hooks/useToken';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

const MaterialFilter = (props) => {
  const [materials, setMaterials] = useState([
    { id: 1, type: 'PLA' },
    { id: 2, type: 'EASY PLA' },
  ]);

  // const user = useToken();

  const dropdownChangeHandler = (event) => {
    props.onMaterialFilter(event.target.value);
  };

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `token ${user.token}`,
      },
    };
    try {
      const response = await fetch(`${props.api.ip}${props.api.materialFilaments}`, requestOptions);
      const data = await response.json();
      setMaterials(data);
    } catch (e) {
      console.log('Error in MaterialFilter.js');
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <SelectBox>
      <label htmlFor='materials'>Material</label>
      <select
        name='materials'
        value={props.selected}
        onChange={dropdownChangeHandler}
      >
        <option
          key='all-materials'
          value='all'
        >
          All
        </option>
        {materials.map((material) => (
          <option
            key={material.id}
            value={material.type}
          >
            {material.type}
          </option>
        ))}
      </select>
    </SelectBox>
  );
};

export default MaterialFilter;
