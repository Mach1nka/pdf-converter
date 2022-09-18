import { Nullable } from '../../../types/types';

export type AuthDataServer = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthData = {
  username: Nullable<string>;
  isAuth: boolean;
};
