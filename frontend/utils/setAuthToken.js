import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const setAuthToken = () => {
  const token = localStorage.getItem('token');
  const jwt = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000); // Current time in Unix timestamp

  if (!jwt || now >= jwt.exp) {
    delete axios.defaults.headers.common['Authorization'];
    return false;
  }

  axios.defaults.headers.common['Authorization'] = token;
  return true;
};

export default setAuthToken;
