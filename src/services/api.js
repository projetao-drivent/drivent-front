import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});
console.log('🚀 ~ file: api.js:6 ~ process.env.REACT_APP_API_BASE_URL', process.env.REACT_APP_API_BASE_URL);

export default instance;
