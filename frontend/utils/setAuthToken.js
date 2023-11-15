import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    // eslint-disable-next-line no-debugger
    debugger;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
