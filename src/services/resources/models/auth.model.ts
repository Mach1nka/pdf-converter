import { Nullable } from '../../../types/types';

export enum AuthActions {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

export type AuthResponse = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthData = {
  username: Nullable<string>;
  isAuth: boolean;
};

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface LogoutPayload {
  username: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  username: string;
  refreshToken: string;
}
