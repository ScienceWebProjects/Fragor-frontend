// libs

// hooks
import { useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function DeleteUserBox(props) {
  const user = useToken();
  const navigate = useNavigate();

  const { onDeleteUserBox } = props;

  const deleteConfirmApiCall = async () => {};

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Are you sure you want to delete this user account?</h2>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onDeleteUserBox(false)}
          >
            Back
          </Button>
          <Button
            className='btns-btn'
            color='red'
            onClick={deleteConfirmApiCall}
            id='confirmBtn'
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserBox;
