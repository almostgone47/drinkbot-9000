import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const setAuthToken = () => {
  const token = localStorage.getItem('token');
  let jwt = '';
  if (token) {
    jwt = jwtDecode(token);
  }

  const now = Math.floor(Date.now() / 1000);

  if (!token || now >= jwt.exp) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    return false;
  }

  axios.defaults.headers.common['Authorization'] = token;
  return true;
};

export default setAuthToken;
