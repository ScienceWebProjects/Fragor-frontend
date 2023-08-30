// libs

// hooks
import { useState } from 'react';
import useToken from '../../../Hooks/useToken';

// components

// UI elements
import Button from '../../UI/shared/buttons/Button';
import StyledCheckbox from '../../UI/shared/StyledCheckbox';

// scss
import '../../UI/shared/_box.scss';

function ChangePermissionBox(props) {
  const user = useToken();

  const { onPermissionBox } = props;

  const [changerChecked, setChangerChecked] = useState(false);

  const changePermissionApiCall = async (e) => {
    e.preventDefault();

    const btn = document.getElementById('confirmBtn');
    btn.textContent = 'Wait...';

    const permissionsData = {
      email: props.details.email,
      changer: changerChecked,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(permissionsData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.userSetPermissions}`,
        requestOptions
      );

      if (response.status === 200) {
        onPermissionBox(false);
        alert('Successful permissions change');
      }
      if (response.status === 400) {
        const res400 = await response.json();
        console.log(res400);
        btn.textContent = 'Confirm';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='shadow'>
      <div className='box'>
        <form onSubmit={changePermissionApiCall}>
          <fieldset>
            <legend>{props.details.email} permissions</legend>
            <StyledCheckbox
              label='Changer user'
              name='changer-user'
              onChange={() => {
                setChangerChecked(!changerChecked);
                console.log(changerChecked);
              }}
            />
            <StyledCheckbox
              label='Common user'
              name='common-user'
              defaultChecked
              disabled
            />
          </fieldset>

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
              id='confirmBtn'
              className='btns-btn'
              color='green'
              type='confirm'
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePermissionBox;
