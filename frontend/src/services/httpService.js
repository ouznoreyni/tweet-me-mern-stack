import axios from 'axios';
import logger from './logService';
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

// Add a response interceptor
instance.interceptors.response.use(null, (error) => {
  if (error.response) {
    logger.log(error.response.data);
  } else {
    logger.log(error.message);
  }
  return Promise.reject(error);
});

function setJWT(jwt) {
  instance.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  setJWT,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
