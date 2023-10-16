import {h} from 'preact';
import {Link} from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <a href="/" class={style.logo}>
      <img
        src="../../assets/logo.png"
        alt="Preact Logo"
        height="32"
        width="32"
      />
      <h1>Drinkbot-9000</h1>
    </a>
    <nav>
      <Link activeClassName={style.active} href="/auth">
        Login
      </Link>
    </nav>
  </header>
);

export default Header;
