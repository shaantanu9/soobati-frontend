import axios from 'axios';
import {getAuthCred} from '../utils/storage';

const axiosInterceptorInstance = axios.create({
  // baseURL: 'http://192.168.1.2:8085/api/',
  // baseURL: process.env.BASE_URL,
  baseURL: 'https://curiously-major-quetzal.ngrok-free.app/api/',
});

let showLoader = false;
let skipErrorPopup = false;

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  async (request: any) => {
    let headers: any = {};
    const {token, secretkey} = getAuthCred();

    let config: any = {};

    config = JSON.parse(request?.headers?.config || '{}');

    if (token) {
      headers['authorization'] = 'Bearer ' + token;
      headers['secretkey'] = secretkey || '';
    }

    let customHeader: any = {
      devicedetails: {
        token: 'device to',
        deviceId: 'nmmzzefewfwf',
      },
      offset: new Date().getTimezoneOffset(),
      lang: 'en',
      'Content-Type': 'application/json',
    };

    if (
      config &&
      config.optionalHeaders &&
      Object.keys(config.optionalHeaders).length
    ) {
      customHeader = {...customHeader, ...config.optionalHeaders};
    }

    if (customHeader) {
      if (customHeader?.devicedetails) {
        headers['devicedetails'] = JSON.stringify(customHeader?.devicedetails);
        headers['offset'] = JSON.stringify(new Date().getTimezoneOffset());
        headers['lang'] = 'en';
      }
    }

    request.headers = {...request.headers, ...headers};

    if (config && config.showLoader) {
      showLoader = config.showLoader;
      // loader(true);
    }

    if (config?.skipErrorPopup) {
      skipErrorPopup = config.skipErrorPopup;
    }
    return request;
  },
  error => {
    if (showLoader) {
      // loader(false);
    }
    console.log({requestError: error});
    return;
  },
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  response => {
    if (showLoader) {
      // loader(false);
    }

    return response;
  },
  error => {
    const response = error?.response as any;

    if (showLoader) {
      // loader(false);
    }

    if (!skipErrorPopup) {
      if (
        response?.data?.message &&
        typeof response?.data?.message.message === 'string'
      ) {
        // _utilityService.showErrorAlert(
        //   response?.data?.message.message || 'Something went wrong',
        // );
      } else if (
        response?.data.message == 'No token provided.' &&
        response?.data.auth == false
      ) {
        null;
      } else {
        // _utilityService.showErrorAlert(
        //   response?.data?.message || 'Something went wrong',
        // );
      }
    }

    throw new Error(error);
  },
);
// End of Response interceptor

export default axiosInterceptorInstance;
