import {h} from 'preact';
import {useState} from 'preact/hooks';
import toast from 'react-hot-toast';
import axios from 'axios';
import {route} from 'preact-router';

import setAuthToken from '../../../utils/setAuthToken';
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Login = () => {
  const [loginRegister, setLoginRegister] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const changeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    axios
      .post('/api/users/login', {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        const {jwtToken, user} = res.data;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthToken();
        toast.success('Success!');
        route('/', true);
      })
      .catch((err) => {
        toast.error('Unable to Authenticate. ' + err.msg);
        console.log('auth err: ', err);
      });
    setUserData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const register = () => {
    axios
      .post('/api/users/register', {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        const {jwtToken, user} = res.data;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthToken(jwtToken);
        toast.success('Success!');
        route('/', true);
      })
      .catch((err) => {
        toast.error('Unable to Authenticate. ' + err.msg);
        console.log('auth err: ', err);
      });
    setUserData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div class={style.form}>
      <h1>{loginRegister ? 'Login' : 'Register'}</h1>

      <div class={style.inputContainer}>
        <div class={style.formInput}>
          <div>
            <label for="email">Email: </label>
          </div>
          <div>
            <input
              id="email"
              type="text"
              name="email"
              onChange={changeHandler}
              value={userData.email}
            />
          </div>
        </div>
        <div class={style.formInput}>
          <div>
            <label for="password">Password: </label>
          </div>
          <div>
            <input
              id="password"
              type="password"
              name="password"
              onChange={changeHandler}
              value={userData.password}
            />
          </div>
        </div>
        {!loginRegister && (
          <div class={style.formInput}>
            <div>
              <label for="confirmPassword">Confirm Password: </label>
            </div>
            <div>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={changeHandler}
                value={userData.confirmPassword}
              />
            </div>
          </div>
        )}
        <div class={style.formButton}>
          {loginRegister ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={register}>Register</button>
          )}
        </div>
      </div>
      <div>
        <p>
          Already have an account?{'  '}
          <button onClick={() => setLoginRegister(!loginRegister)}>
            {loginRegister ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
