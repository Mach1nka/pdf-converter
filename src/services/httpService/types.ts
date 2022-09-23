export interface CommonData {
  success: boolean;
}

export interface BaseResponse<T> extends CommonData {
  data: T;
}

export interface ErrorResponse extends CommonData {
  errors: {
    type: string;
    code: string;
    status: string;
    message: string;
  };
}

export type ErrorInfo = {
  message: string;
  status: number;
};

export type Params = Record<string, string>;

export enum HttpStatus {
  InvalidCredentials = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500,
}

export const HttpErrorCodes = [
  HttpStatus.InternalError,
  HttpStatus.InvalidCredentials,
  HttpStatus.Forbidden,
  HttpStatus.InternalError,
];
