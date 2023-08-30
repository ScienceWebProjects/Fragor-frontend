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

  const deleteConfirmApiCall = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.userAccountDelete_email}${props.details.email}/`,
        requestOptions
      );

      if (response.status === 204) {
        alert('Succesfully printer delete.');
        sessionStorage.setItem('userDetails', '');
        navigate(props.api.usersPage);
      }

      if (response.status === 404) {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
