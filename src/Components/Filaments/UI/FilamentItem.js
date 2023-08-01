// libs

// components
import Button from '../../UI/shared/buttons/Button';

// scss
import '../scss/_filament-item.scss';

const FilamentItem = (props) => {
  return (
    <Button
      className='filament-item'
      color='red'
    >
      <h2>{props.type}</h2>
      <div>
        <div className=''>Color: {props.color}</div>
        <div className=''>Quantity: {props.quantity} g</div>
      </div>
    </Button>
  );
};

export default FilamentItem;
