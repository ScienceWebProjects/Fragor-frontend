// libs

// hooks
import { useState } from 'react';
import useToken from '../../Hooks/useToken';

// scss
import './scss/_delete-box.scss';

// UI elements
import Button from '../UI/shared/buttons/Button';

function DeleteBox(props) {
  const user = useToken();

  const { setDeleteBox } = props;

  const deleteConfirm = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printerDelete}${props.id}/`,
        requestOptions
      );

      if (response.status === 201) {
        alert('Succesfully printer delete.');
      }

      if (response.status === 404) {
        alert(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='shadow'
      onClick={() => {
        setDeleteBox(false);
      }}
    >
      <div className='box'>
        <h2>Are you sure you want to delete printer:</h2>
        <h3>{props.printerName}</h3>
        <div className='box-btns'>
          <Button
            className='btns-btn'
            color='yellow'
            onClick={() => setDeleteBox(false)}
          >
            Back
          </Button>
          <Button
            className='btns-btn'
            color='red'
            onClick={deleteConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBox;
