// libs
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

// components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements

// scss
import './UI/_custom-select.scss';

function CustomSelect({
  options,
  defaultSelected,
  onCustomSelect,
  selectClass,
  labelKey, // Dodane: klucz używany do pobierania nazwy z obiektu
  valueKey, // Dodane: klucz używany do pobierania wartości z obiektu
}) {
  const intl = useIntl();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onCustomSelect(option[valueKey]); // Zwracamy wartość z obiektu przy wywoływaniu callbacka
    console.log(option[valueKey]); // Logujemy wartość z obiektu
  };

  const minMaxHeight =
    options.length <= 1
      ? 45
      : options.length <= 2
      ? 90
      : options.length <= 3
      ? 130
      : 165;

  return (
    <div className={`custom-select ${selectClass} ${isOpen ? 'open' : ''}`}>
      <div
        className='selected-option'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption
          ? selectedOption[labelKey] // Zwracamy nazwę z obiektu
          : defaultSelected ||
            intl.formatMessage({
              id: 'customSelect',
              defaultMessage: 'Click to choose',
            })}
      </div>
      <ul className='options'>
        <InfiniteScroll
          dataLength={options.length}
          hasMore={false}
          height={minMaxHeight}
        >
          {options.map((option) => (
            <li
              key={option[valueKey]} // Używamy wartości z obiektu jako klucza
              className='option'
              onClick={() => handleOptionClick(option)}
            >
              {option[labelKey]} {/* Zwracamy nazwę z obiektu */}
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}

export default CustomSelect;
