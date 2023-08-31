// libs

// hooks
import useToken from '../../Hooks/useToken';

// components

// UI elements
import StyledLink from '../UI/shared/StyledLink';

// scss

function CompanyItem(props) {
  const user = useToken();

  const companyDetailsHandler = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.ownersCompanyUsersGet_id}${props.company.id}/`,
        requestOptions
      );

      if (response.status === 404) {
        const res = await response.json();
        console.log(res);
        alert(res.message);
      }

      const companyUsersData = await response.json();

      if (!!companyUsersData) {
        props.onCompanyUsersSelect(companyUsersData);
        sessionStorage.setItem('companyUsers', JSON.stringify(companyUsersData));
        console.log('Company users saved in session storage');

        props.onCompanyDetailsSelect(props.company);
        sessionStorage.setItem('companyDetails', JSON.stringify(props.company));
        console.log('Company details saved in session storage');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLink
      to={{
        pathname: `${props.api.ownersPage}/filament-${props.company.id}`,
        state: { company: props.company },
      }}
      style={{ cursor: 'pointer', width: '100%' }}
      className=''
      onClick={companyDetailsHandler}
    >
      {props.company.company}
    </StyledLink>
  );
}

export default CompanyItem;
