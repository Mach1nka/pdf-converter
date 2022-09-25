import httpService from '../../httpService';
import { AuthCredentials, AuthResponse } from '../models/auth.model';
import { authManagement } from '../storages/client';
import { AuthKeys } from '../storages/types';

const register = (credentials: AuthCredentials) =>
  httpService.post<string, AuthCredentials>('/auth/register', {}, credentials);

const login = (credentials: AuthCredentials) =>
  httpService.post<AuthResponse, AuthCredentials>('/auth/login', {}, credentials).then((resp) => {
    httpService.setToken(resp.data.accessToken);
    authManagement.save(AuthKeys.REFRESH_TOKEN, resp.data.refreshToken);
    return resp;
  });

const refreshToken = (credentials: AuthCredentials) =>
  httpService.post<AuthResponse, AuthCredentials>('/auth/refresh', {}, credentials).then((resp) => {
    httpService.setToken(resp.data.accessToken);
    authManagement.save(AuthKeys.REFRESH_TOKEN, resp.data.refreshToken);
    return resp;
  });

const logout = (credentials: AuthCredentials) =>
  httpService.post<string, AuthCredentials>('/auth/logout', {}, credentials).then((resp) => {
    httpService.resetToken();
    authManagement.delete(AuthKeys.REFRESH_TOKEN);
    return resp;
  });

export { register, login, refreshToken, logout };
