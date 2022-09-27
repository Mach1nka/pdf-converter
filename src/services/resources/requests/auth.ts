import httpService from '../../httpService';
import {
  AuthCredentials,
  AuthResponse,
  LogoutPayload,
  RefreshTokenPayload,
} from '../models/auth.model';
import { authManagement } from '../storages/client';
import { AuthKeys } from '../storages/types';

const register = (credentials: AuthCredentials) =>
  httpService.post<string, AuthCredentials>('/auth/register', {}, credentials);

const login = (credentials: AuthCredentials) =>
  httpService.post<AuthResponse, AuthCredentials>('/auth/login', {}, credentials).then((resp) => {
    httpService.setToken(resp.data.accessToken);
    authManagement.save(AuthKeys.REFRESH_TOKEN, resp.data.refreshToken);
    authManagement.save(AuthKeys.USERNAME, resp.data.username);
    return resp;
  });

const refreshToken = (credentials: RefreshTokenPayload) =>
  httpService
    .post<AuthResponse, RefreshTokenPayload>('/auth/refresh', {}, credentials)
    .then((resp) => {
      httpService.setToken(resp.data.accessToken);
      authManagement.save(AuthKeys.REFRESH_TOKEN, resp.data.refreshToken);
      authManagement.save(AuthKeys.USERNAME, resp.data.username);
      return resp;
    });

const logout = (credentials: LogoutPayload) =>
  httpService.post<string, LogoutPayload>('/auth/logout', {}, credentials).then((resp) => {
    httpService.resetToken();
    authManagement.delete(AuthKeys.REFRESH_TOKEN);
    authManagement.delete(AuthKeys.USERNAME);
    return resp;
  });

export { register, login, refreshToken, logout };
