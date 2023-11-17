// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// UI elements

// scss

function Charts({ api }) {
  const user = useToken();
  const permission = usePermissions(user);

  const chartsDataApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.AI_ip}${api.AIChartsDataGet}`,
        requestOptions
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chartsDataApiCall();
  });

  if (permission.logged === 'logout') {
    return <LogoutUser api={api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'></main>
      <StyledLink to={api.printersPage}>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </StyledLink>
    </div>
  );
}

export default Charts;
