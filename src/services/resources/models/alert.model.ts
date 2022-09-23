export enum AlertSeverity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum AlertActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export type AlertData = {
  id: string;
  severity: AlertSeverity;
  message: string;
};
