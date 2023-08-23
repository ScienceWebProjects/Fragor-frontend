// libs

// hooks
import { useState, useEffect } from 'react';
// import useToken from '../../Hooks/useToken';

// components
import TopBar from '../_shared/TopBar';

// UI elements
// import StyledLink from '../UI/shared/StyledLink';
// import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_content.scss';

function UserDetails(props) {
  const [details, setDetails] = useState(props.details);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userDetails');
    setDetails(JSON.parse(storedUser));
  }, []);

  if (!details) {
    return <div>No user selected.</div>;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <div className='content'>
          <h1>
            {details.name} {details.surname}
          </h1>
        </div>
      </main>
    </div>
  );
}

export default UserDetails;
