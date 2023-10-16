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
          <label for="email">Email</label>
          <input id="email" type="text" />
        </div>
        <div class={style.formInput}>
          <label for="password">Password</label>
          <input id="password" type="password" />
        </div>
        <div class={style.formInput}>
          <button>Save</button>
        </div>
      </div>
      <div>
        <p>
          Already have an account?{'  '}
          <button onClick={() => setLoginRegister(!loginRegister)}>
            {loginRegister ? 'register' : 'login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
