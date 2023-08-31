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
import DeleteBox from '../_shared/DeleteBox';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';

// scss

function BrandsOptions(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [brandEntered, setBrandEntered] = useState('');

  // properties for material delete
  const [brands, setBrands] = useState([]);
  const [brandID, setBrandID] = useState(0);
  const [deleteBox, setDeleteBox] = useState(false);

  const brandAddHandler = async (e) => {
    e.preventDefault();

    const brandData = {
      brand: brandEntered,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(brandData),
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.settingFilamentBrandAdd}`,
        requestOptions
      );

      if (response.status === 200) {
        return alert('Succesfully brand added.');
      }

      if (response.status === 404) {
        const res404 = await response.json();
        return res404.message ? alert(res404.message) : alert('Something went bad.');
      }
    } catch (error) {
      console.log(error);
      alert('An unpredictable problem has been encountered. \nPlease add brand again.');
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
        `${props.api.ip}${props.api.filamentsBrandsGet}`,
        requestOptions
      );

      const brandList = await response.json();
      setBrands(brandList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  if (permission.logged === 'logout') {
    return <LogoutUser api={props.api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
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
          <form onSubmit={brandAddHandler}>
            <StyledLabel htmlFor='brand-name'>Brand name</StyledLabel>
            <StyledInput
              name='brand-name'
              id='brand-name'
              type='text'
              value={brandEntered}
              onChange={(event) => {
                setBrandEntered(event.target.value);
              }}
              required
            />
            <Button
              className=''
              color='yellow'
              type='submit'
            >
              Add brand
            </Button>
          </form>

          {brands.map((brand) => (
            <div
              key={`material-${brand.id}`}
              className='list-element'
            >
              <div className='element-label'>{brand.brand}</div>
              <Button
                color='red'
                className='element-delete'
                onClick={() => {
                  setBrandID(brand.id);
                  setDeleteBox(true);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </InfiniteScroll>
      </main>

      <StyledLink to={props.api.settingsFilamentsOptions}>
        <Button color='red'>Back</Button>
      </StyledLink>

      {deleteBox && (
        <DeleteBox
          api={props.api}
          ID={brandID}
          endpoint={props.api.settingFilamentBrandDelete_id}
          deleteOption='brand'
          onDeleteBox={setDeleteBox}
        />
      )}
    </div>
  );
}

export default BrandsOptions;
