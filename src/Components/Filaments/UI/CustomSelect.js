// libs

// hooks
import { useState } from 'react';
import useWindowSize from '../../../Hooks/useWindowSize';

// components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements

// scss
import '../scss/_custom-select.scss';

function CustomSelect({ options, defaultSelected, onCustomSelect, selectClass }) {
  const windowSize = useWindowSize();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onCustomSelect(option);
    console.log(option);
  };

  const minMaxHeight =
    options.length <= 1 ? 45 : options.length <= 2 ? 90 : options.length <= 3 ? 130 : 165;

  return (
    <div className={`custom-select ${selectClass} ${isOpen ? 'open' : ''}`}>
      <div
        className='selected-option'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : defaultSelected}
      </div>
      <ul className='options'>
        <InfiniteScroll
          dataLength={options.length}
          hasMore={false}
          height={minMaxHeight}
        >
          {options.map((option) => (
            <li
              key={option}
              className='option'
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}

export default CustomSelect;
