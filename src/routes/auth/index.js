import {h} from 'preact';
import {useState} from 'preact/hooks';

import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Login = ({user}) => {
  const [loginRegister, setLoginRegister] = useState(true);

  return (
    <div class={style.form}>
      <h1>{loginRegister ? 'Login' : 'Register'}</h1>

      <div class={style.inputContainer}>
        <div class={style.formInput}>
          <div>
            <label for="email">Email: </label>
          </div>
          <div>
            <input id="email" type="text" />
          </div>
        </div>
        <div class={style.formInput}>
          <div>
            <label for="password">Password: </label>
          </div>
          <div>
            <input id="password" type="password" />
          </div>
        </div>
        {!loginRegister && (
          <div class={style.formInput}>
            <div>
              <label for="confirmPassword">Confirm Password: </label>
            </div>
            <div>
              <input id="confirmPassword" type="password" />
            </div>
          </div>
        )}
        <div class={style.formButton}>
          <button>Save</button>
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
