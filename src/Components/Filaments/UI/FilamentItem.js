// libs

// hooks
import useToken from '../../../Hooks/useToken';

// components
import StyledLink from '../../UI/shared/StyledLink';

// scss
import '../scss/_filament-list.scss';

const FilamentItem = (props) => {
  const user = useToken();

  const filamentDetailsHandler = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.filamentGet}${props.filament.id}/`,
        requestOptions
      );

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
        alert(res.message);
      }

      const filamentData = await response.json();

      if (!!filamentData) {
        props.onFilamentSelect(filamentData);
        sessionStorage.setItem('filamentDetails', JSON.stringify(filamentData));
        console.log('Filament saved in session storage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLink
      to={{
        pathname: `${props.api.filamentsPage}/filament-${props.filament.id}`,
        state: { filament: props.filament },
      }}
      style={{ cursor: 'pointer', width: '100%' }}
      className='filament-item'
      onClick={filamentDetailsHandler}
    >
      <h2>{props.filament.type}</h2>
      <div>
        <div className=''>Color: {props.filament.color}</div>
        <div className=''>Quantity: {props.filament.quantity} kg</div>
      </div>
    </StyledLink>
  );
};

export default FilamentItem;
