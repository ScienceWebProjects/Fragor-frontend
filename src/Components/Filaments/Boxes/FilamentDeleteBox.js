// libs

// hooks
import { useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function FilamentDeleteBox(props) {
  const user = useToken();
  const navigate = useNavigate();

  const { onFilamentDeleteBox } = props;

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
        `${props.api.ip}${props.api.filamentDelete_id}${props.details.id}/`,
        requestOptions
      );

      if (response.status === 204) {
        onFilamentDeleteBox(false);
        alert('Succesfull filament deleted.');
        navigate(props.api.filamentsPage);
      }

      if (response.status === 404) {
        alert(response.message);
      }

      btn.textContent = 'Delete';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Are you sure you want to delete this filament?</h2>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onFilamentDeleteBox(false)}
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

export default FilamentDeleteBox;
