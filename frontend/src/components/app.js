import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import {Router} from 'preact-router';
import {Toaster} from 'react-hot-toast';

import Header from './header';
// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Drinks from '../routes/drinks';
import Auth from '../routes/auth';
import Advertisement from '../components/advertisement';
import setAuthToken from '../utils/setAuthToken';

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const isValidToken = setAuthToken();
    if (isValidToken) {
      loginHandler();
    } else {
      logoutHandler();
    }
  }, []);

  const loginHandler = () => {
    setLoginStatus(true);
  };

  const logoutHandler = () => {
    setLoginStatus(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div id="app">
      <Header loginStatus={loginStatus} logoutHandler={logoutHandler} />
      <Toaster position="top-center" />
      <main>
        <Router>
          <Home path="/" loginStatus={loginStatus} />
          <Drinks path="/change-drink/" user="me" />
          <Auth path="/auth" setLoginStatus={setLoginStatus} />
        </Router>
      </main>
      <Advertisement />
      <footer style="color: #fff; background:#000;padding:1px 8px;">
        &copy; 2023 DrinkingBuddy-9000
      </footer>
    </div>
  );
};

export default App;
