// libs

// hooks
import { useState } from 'react';

// components

// UI elements

// scss
import '../scss/_custom-select.scss';

function CustomSelect({ options, defaultSelected, onCustomSelect, isRequired }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onCustomSelect(option);
    console.log(option);
  };

  return (
    <div className={`custom-select ${isOpen ? 'open' : ''}`}>
      <div
        className='selected-option'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : defaultSelected}
      </div>
      <ul className='options'>
        {options.map((option) => (
          <li
            key={option}
            className='option'
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
