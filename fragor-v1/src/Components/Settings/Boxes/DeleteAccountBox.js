// libs

// hooks
import { useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function DeleteAccountBox(props) {
  const user = useToken();
  const navigate = useNavigate();

  const { setDeleteAccountBox } = props;

  const deleteConfirmApiCall = async () => {
    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Deleting...';

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingDeleteAccount}/`,
        requestOptions
      );

      if (response.status === 204) {
        setDeleteAccountBox(false);
        navigate(props.api.loginPage);
        alert('Succesfull account deleted.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h1>Are you sure you want to delete your account?</h1>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => setDeleteAccountBox(false)}
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

export default DeleteAccountBox;
