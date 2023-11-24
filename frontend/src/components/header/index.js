import {h} from 'preact';
import {Link} from 'preact-router/match';
import style from './style.css';

const Header = ({loginStatus, logoutHandler}) => {
  return (
    <header class={style.header}>
      <a href="/" class={style.logo}>
        <img
          src="../../assets/logo.png"
          alt="Preact Logo"
          height="32"
          width="32"
        />
        <h1>DrinkingBuddy-9000</h1>
      </a>
      {console.log('loggedIn: ', loginStatus)}
      <nav>
        {loginStatus ? (
          <Link activeClassName={style.active} href="/" onClick={logoutHandler}>
            Logout
          </Link>
        ) : (
          <Link activeClassName={style.active} href="/auth">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
