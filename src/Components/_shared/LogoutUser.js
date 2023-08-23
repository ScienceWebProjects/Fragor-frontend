// libs

// hooks

// components
import TopBar from './TopBar';

// UI elements

// scss

function LogoutUser(props) {
  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main
        className='App-header'
        style={{ color: '#000' }}
      >
        <div>
          You don't have accsess to this page. Please <a href={props.api.loginPage}>login</a>.
        </div>
      </main>
    </div>
  );
}

export default LogoutUser;
