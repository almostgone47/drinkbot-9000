import {h} from 'preact';
import {Router} from 'preact-router';
import {Toaster} from 'react-hot-toast';

import Header from './header';
// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Drinks from '../routes/drinks';
import Auth from '../routes/auth';

const App = () => (
  <div id="app">
    <Header />
    <Toaster position="top-center" />
    <main>
      <Router>
        <Home path="/" />
        <Drinks path="/change-drink/" user="me" />
        <Auth path="/auth" />
      </Router>
    </main>
    <footer style="color: #fff; background:#000;padding:1px 8px;">
      &copy; 2023 DrinkingBuddy-9000
    </footer>
  </div>
);

export default App;
