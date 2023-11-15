import {h} from 'preact';
import {Link} from 'preact-router/match';
import {jwtDecode} from 'jwt-decode';
import style from './style.css';
import {useEffect, useState} from 'preact/hooks';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const jwt = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Current time in Unix timestamp

    if (!jwt || now >= jwt.exp) {
      logout();
    } else {
      setLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
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
