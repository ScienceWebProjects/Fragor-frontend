// libs

// hooks
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function ChangePermissionBox(props) {
  const user = useToken();

  const { onPermissionBox } = props;

  const changePermissionApiCall = async () => {
    console.log('change permission');
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onPermissionBox(false)}
          >
            Back
          </Button>
          <Button
            className='btns-btn'
            color='green'
            onClick={changePermissionApiCall}
            id='confirmBtn'
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePermissionBox;
