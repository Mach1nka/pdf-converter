import { useReducer, Context, createContext, Dispatch, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { AlertData, AlertActions } from '../services/resources/models/alert.model';

type AddAction = {
  type: AlertActions.ADD;
  payload: AlertData;
};

type RemoveAction = {
  type: AlertActions.REMOVE;
  payload: string;
};

type Action = AddAction | RemoveAction;

interface AlertContextValue {
  alerts: AlertData[];
  dispatch: Dispatch<Action>;
}

const initialState: AlertData[] = [];

const reducer = (state: AlertData[], action: Action): AlertData[] => {
  switch (action.type) {
    case AlertActions.ADD:
      return [...state, ...[action.payload]];
    case AlertActions.REMOVE:
      return state.filter((el) => el.id !== action.payload);
    default:
      return state;
  }
};

export const AlertContext: Context<AlertContextValue> = createContext<AlertContextValue>({
  alerts: initialState,
  dispatch: () => {},
});

const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AlertContext.Provider value={{ alerts: state, dispatch }}>{children}</AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertProvider;
