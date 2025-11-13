//npm i axios 
/*
axios is a library that helps with requests from the backend. You need to install it before you can use it using npm

*/
import axios from 'axios';

const BaseURL = 'http://127.0.0.1:8000/';

const AxiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

export default AxiosInstance