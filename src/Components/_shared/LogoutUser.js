// components
import TopBar from './TopBar';

function LogoutUser() {
  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main
        className='App-header'
        style={{ color: '#000' }}
      >
        You don't have accsess to this page. Please login.
      </main>
    </div>
  );
}

export default LogoutUser;
