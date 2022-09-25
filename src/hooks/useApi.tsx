import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { AlertContext } from '../contexts/Alert';
import { LoaderContext } from '../contexts/Loader';
import { BaseResponse, ErrorInfo } from '../services/httpService/types';
import { AlertActions, AlertSeverity } from '../services/resources/models/alert.model';

const useApi = <T, P>(
  request: (data: P) => Promise<BaseResponse<T>>,
): ((data: P) => Promise<BaseResponse<T>>) => {
  const { setLoading } = useContext(LoaderContext);
  const { dispatch } = useContext(AlertContext);

  const callback = async (data: P): Promise<BaseResponse<T>> => {
    try {
      setLoading(true);
      return await request(data);
    } catch (e) {
      const error = e as ErrorInfo;
      dispatch({
        type: AlertActions.ADD,
        payload: {
          id: uuid(),
          severity: AlertSeverity.Error,
          message: error.message as string,
        },
      });

      throw e;
    } finally {
      setLoading(false);
    }
  };

  return callback;
};

export default useApi;
