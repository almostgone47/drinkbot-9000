import {h} from 'preact';
import {Router} from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import ChangeDrink from '../routes/changeDrink';
import Auth from '../routes/auth';

const App = () => (
  <div id="app">
    <Header />
    <main>
      <Router>
        <Home path="/" />
        <ChangeDrink path="/change-drink/" user="me" />
        <Auth path="/auth" />
      </Router>
    </main>
    <footer style="color: #fff; background:#000;padding:1px 8px;">
      &copy; 2023 Drinkbot-9000
    </footer>
  </div>
);

export default App;
