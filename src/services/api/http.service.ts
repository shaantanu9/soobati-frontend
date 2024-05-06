import {AxiosResponse} from 'axios';
// import axiosInterceptorInstance from '../../interceptors/token.interceptors';
import axiosInterceptorInstance from '../../interceptors/token.interceptors';
import {ApiConfig, ApiResponse} from '../../models/api.interface';
import Config from '../../utils/config';

// import {} from '../../env';
export class HttpService {
  private apiUrl: any;
  private http = axiosInterceptorInstance;

  constructor() {
    this.apiUrl = Config.BASE_URL;
  }
  //
  post<T = any>(
    url: string,
    data: any,
    config: ApiConfig = {showLoader: true},
  ): Promise<ApiResponse<T>> {
    console.log('this.apiUrl + url', this.apiUrl + url);
    console.log('data from post data', data);

    return this.http
      .post<ApiResponse<T>>(
        this.apiUrl + url,
        data,
        this.getCustomHeader(config),
      )
      .then((response: AxiosResponse<ApiResponse<T>>) => {
        return response.data;
      });
  }

  put<T = any>(
    url: string,
    data: any,
    config: ApiConfig = {showLoader: true},
  ): Promise<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(
        this.apiUrl + url,
        data,
        this.getCustomHeader(config),
      )
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data);
  }

  patch<T = any>(
    url: string,
    data: any,
    config: ApiConfig = {showLoader: true},
  ): Promise<ApiResponse<T>> {
    return this.http
      .patch<ApiResponse<T>>(
        this.apiUrl + url,
        data,
        this.getCustomHeader(config),
      )
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data);
  }

  get<T = any>(
    url: string,
    httpParams?: any,

    config: ApiConfig = {showLoader: true},
  ): Promise<ApiResponse<T>> {
    for (let item in httpParams) {
      if (
        httpParams[item] === '' ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    const header: any = this.getCustomHeader(config);
    if (httpParams) {
      header['params'] = httpParams;
    }

    console.log('this.apiUrl + url', {
      url: this.apiUrl + url,
      header: header,
    });
    return this.http
      .get<ApiResponse<T>>(this.apiUrl + url, header)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data);
  }

  delete<T = any>(
    url: string,
    httpParams?: any,
    config?: ApiConfig,
  ): Promise<ApiResponse<T>> {
    for (let item in httpParams) {
      if (
        httpParams[item] === '' ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    const header: any = this.getCustomHeader(config);
    if (httpParams) {
      header['params'] = httpParams;
    }
    return this.http
      .delete<ApiResponse<T>>(this.apiUrl + url, header)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data);
  }

  getCustomHeader(config: any) {
    return {
      headers: {
        config: JSON.stringify(config || {}),
      },
    };
  }

  getExternalHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
