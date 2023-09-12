// libs

// hooks
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';

// scss
import '../../UI/shared/_box.scss';

function AddDeviceBox(props) {
  const user = useToken();

  const { onAddDeviceBox } = props;

  const addConfirmApiCall = async () => {
    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.deviceNewAdd}`, requestOptions);

      if (response.status === 201) {
        onAddDeviceBox(false);
        alert(`Succesfull device added.`);
        window.location.reload();
      }
      if (response.status === 400) {
        const res = await response.json();
        alert(res.message);
      }

      btn.textContent = 'Confirm';
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        btn.textContent = 'Confirm';
      }, 1000);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <h2>Add new device?</h2>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            type='button'
            onClick={() => onAddDeviceBox(false)}
          >
            Back
          </Button>
          <Button
            className='btns-btn'
            color='green'
            onClick={addConfirmApiCall}
            id='confirmBtn'
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDeviceBox;
