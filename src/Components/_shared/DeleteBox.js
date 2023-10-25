// libs

// hooks
import useToken from '../../Hooks/useToken';

// components

// UI elements
import Button from '../UI/shared/buttons/Button';

// scss
import '../UI/shared/_box.scss';

function DeleteBox({ api, ID, endpoint, deleteOption, onDeleteBox }) {
  const user = useToken();

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
        `${api.ip}${endpoint}${ID}/`,
        requestOptions
      );

      if (response.status === 204) {
        onDeleteBox(false);
        alert(`Succesfull ${deleteOption} deleted.`);
        window.location.reload();
      }
      if (response.status === 409) {
        const res = await response.json();
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Delete {deleteOption}?</h2>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onDeleteBox(false)}
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

export default DeleteBox;
