// libs

// hooks

// components

// UI elements

// scss
import './_styled-checkbox.scss';

function StyledCheckbox(props) {
  const { label, name, defaultChecked, disabled, onChange } = props;

  return (
    <div className='styled-input'>
      <label
        htmlFor={name}
        className='input-label'
      >
        {label}
      </label>
      <input
        className='input-checkbox'
        type='checkbox'
        id={name}
        name={name}
        onChange={onChange}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
    </div>
  );
}

export default StyledCheckbox;
