import axios from 'axios';
import createQuery from './query';

axios.defaults.baseURL = process.env.API_URL;

export default (method = 'GET', path = '', query = {}, data = {}) => {
  if (method === 'GET') {
    return axios({
      method: 'GET',
      url: `${path}${createQuery(query)}`
    });
  }
  return axios({
    method: 'POST',
    url: `${path}${createQuery(query)}`,
    data
  });
};
