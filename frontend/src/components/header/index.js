import {h} from 'preact';
import {Link} from 'preact-router/match';
import style from './style.css';
import {useEffect, useState} from 'preact/hooks';
import setAuthToken from '../../../utils/setAuthToken';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const tokenValid = setAuthToken;

    if (tokenValid) {
      logout();
    } else {
      setLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

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
      <nav>
        {loggedIn ? (
          <Link activeClassName={style.active} href="/" onClick={logout}>
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
