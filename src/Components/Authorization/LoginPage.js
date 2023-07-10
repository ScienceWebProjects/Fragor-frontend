// UI elements
// import Card from '../UI/shared/Card';
import './LoginPage.scss';
import logo from '../../Images/logo-black.png';
import StyledLabel from '../UI/authorization/StyledLabel';
import StyledInput from '../UI/authorization/StyledInput';

// components
import Button from '../UI/shared/buttons/Button';
import Pin from './Pin';
import StyledLink from '../UI/shared/StyledLink';

function LoginPage(props) {
  return (
    <div className='App'>
      <header className='header_logo'>
        <h1 className='logo_txt'>
          3D printing assistant
          <br />
          Project by:
          <br />
          Piotr Goraj & Dawid Franczak
          <br />
        </h1>
        <div className='logo_img'>
          <a href='https://github.com/ScienceWebProjects/filament-measurement'>
            <img
              src={logo}
              alt='Logo'
            />
          </a>
        </div>
      </header>
      <main className='App-header login_form'>
        <div>
          <StyledLabel htmlFor='user-email'>E-mail</StyledLabel>
          <StyledInput
            name='user-email'
            id='user-email'
            type='email'
            // value={enteredUserEmail}
            // onChange={userEmailChangeHandler}
          ></StyledInput>
        </div>
        <div>
          <Pin />
        </div>
        <StyledLink to={props.api.home}>
          <Button color='red'>Log in</Button>
        </StyledLink>
        <StyledLink to={props.api.signinPage}>
          <Button color='yellow'>Sign in</Button>
        </StyledLink>
        <div className='main_additionals'>
          <StyledLink
            to={'/'}
            className='additionals_reminder'
          >
            Forget PIN?
          </StyledLink>
          <StyledLink to={'/'}>Privacy</StyledLink>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
