import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AlertContext } from '../contexts/Alert';
import { LoaderContext } from '../contexts/angudiagn';
import { BaseResponse, ErrorInfo } from '../services/httpService/types';
import { AlertActions, AlertSeverity } from '../services/resources/models/alert.model';
import { Nullable } from '../types/types';

const useQuery = <T,>(request: () => Promise<BaseResponse<T>>): BaseResponse<Nullable<T>> => {
  const { setLoading } = useContext(LoaderContext);
  const { dispatch } = useContext(AlertContext);
  const [response, setResponse] = useState<Nullable<BaseResponse<T>>>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await request();
        setResponse(response);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    success: response?.success || false,
    data: response?.data || null,
  };
};

export default useQuery;
