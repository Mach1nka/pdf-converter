import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  ResponseType,
} from 'axios';

import { Nullable } from '../../types/types';
import { authManagement } from '../resources/storages/client';
import { ErrorResponse, HttpStatus } from './types';

class ApiBase {
  instance: AxiosInstance;

  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  private defaultResponseType: ResponseType = 'json';

  private accessToken: Nullable<string> = null;

  public setToken(token: string) {
    this.accessToken = `Bearer ${token}`;
  }

  public resetToken() {
    this.accessToken = null;
  }

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      headers: this.defaultHeaders,
      responseType: this.defaultResponseType,
      timeout: 5 * 1000,
      timeoutErrorMessage: 'Request timeout.',
    });

    this.initRequestInterceptor();
    this.initResponseInterceptor();
  }

  private initRequestInterceptor() {
    this.instance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
      // const token = localStorageService.getToken();

      if (this.accessToken) {
        if (!requestConfig.headers) {
          requestConfig.headers = {};
        }
        requestConfig.headers.Authorization = this.accessToken;
      }

      return requestConfig;
    });
  }

  private initResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponse>) => {
        const status = error.response?.data?.errors?.status || error?.response?.status || 500;
        if (Number(status) === HttpStatus.InvalidCredentials) {
          this.resetToken();
        }
        throw error;
      },
    );
  }
}

export default ApiBase;
