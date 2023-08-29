// libs
import React from 'react';
import { useState, useEffect } from 'react';

// custom hooks
import useToken from '../../../Hooks/useToken';

// UI elements
import SelectBox from '../../UI/shared/SelectBox';

const MaterialFilter = (props) => {
  const user = useToken();

  const [materials, setMaterials] = useState([]);

  const dropdownChangeHandler = (event) => {
    props.onMaterialFilter(event.target.value);
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
        `${props.api.ip}${props.api.filamentsMaterialsGet}`,
        requestOptions
      );

      const materialsList = await response.json();
      setMaterials(materialsList);
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
          {materials.map((material, index) => (
            <option
              key={`material-${index}`}
              value={material.material}
            >
              {material.material}
            </option>
          ))}
        </select>
      </div>
    </SelectBox>
  );
};

export default MaterialFilter;
