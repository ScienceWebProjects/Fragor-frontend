// libs

// hooks
import { useState, useEffect } from 'react';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import InfiniteScroll from 'react-infinite-scroll-component';
import CompanyItem from './CompanyItem';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import InfoType from '../Authorization/Signin/UI/InfoType';
import StyledInput from '../UI/authorization/StyledInput';
import StyledLabel from '../UI/authorization/StyledLabel';

// scss

function OwnersPage(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [companyNameEntered, setCompanyNameEntered] = useState('');
  const [companies, setCompanies] = useState([]);

  const addCompanyHandler = async (e) => {
    e.preventDefault();

    const companyData = {
      name: companyNameEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(companyData),
    };

    try {
      const response = await fetch(`${props.api.ip}${props.api.ownersCompanyAdd}`, requestOptions);

      if (response.status === 201) {
        alert('Succesfully company added.');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add company again.');
    }
  };

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${props.api.ip}${props.api.ownersCompaniesGetAll}`,
        requestOptions
      );

      const companiesList = await response.json();
      setCompanies(companiesList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  });

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main>
        <InfiniteScroll
          dataLength={''}
          hasMore={false}
          height={windowSize * 0.7}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '85vw',
            textAlign: 'center',
            alignItems: 'center',
            padding: '0px 15px 0 15px',
            margin: '10px',
          }}
        >
          <InfoType text={'New company'} />
          <form
            onSubmit={addCompanyHandler}
            className=''
          >
            <StyledLabel htmlFor='company-name'>Company name</StyledLabel>
            <StyledInput
              name='company-name'
              id='company-name'
              type='text'
              value={companyNameEntered}
              onChange={(event) => {
                setCompanyNameEntered(event.target.value);
              }}
              required
            />
            <Button
              className=''
              color='yellow'
              type='submit'
            >
              Add company
            </Button>
          </form>

          <InfoType text={'All companies'} />
          {companies.map((company) => (
            <Button
              key={`material-${company.id}`}
              className='company-button'
              color='blue'
            >
              <CompanyItem
                api={props.api}
                company={company}
                onCompanyDetailsSelect={(details) => {
                  props.onCompanyDetailsSelect(details);
                }}
                onCompanyUsersSelect={(users) => {
                  props.onCompanyUsersSelect(users);
                }}
              />
            </Button>
          ))}
        </InfiniteScroll>
      </main>

      <StyledLink to={props.api.home}>
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

export default OwnersPage;
