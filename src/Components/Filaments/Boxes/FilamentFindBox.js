// libs

// hooks

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function FilamentFindBox(props) {
  const { filamentData, onFilamentFindBox } = props;

  return (
    <div className='shadow'>
      <div className='box'>
        <section className=''>
          <h3>Quantity: {filamentData.quantity} g</h3>
          <div>Material: {filamentData.material}</div>
          <div>Color: {filamentData.color}</div>
          <div>Brand: {filamentData.brand}</div>
          <div>Diameter: {filamentData.diameter}</div>
        </section>

        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onFilamentFindBox(false)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilamentFindBox;
