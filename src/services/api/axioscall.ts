import axios from 'axios';
import Config from '../../utils/config';
const axioscall = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axioscall;
