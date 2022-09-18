import { useReducer, Context, createContext, Dispatch, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { AuthData } from '../services/resources/models/auth.model';

export enum AuthActions {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

type AuthLogInAction = {
  type: AuthActions.LOG_IN;
  payload: AuthData;
};

type AuthLogOutAction = {
  type: AuthActions.LOG_OUT;
};

type Action = AuthLogInAction | AuthLogOutAction;

interface AuthContextValue extends AuthData {
  dispatch: Dispatch<Action>;
}

const initialState: AuthData = {
  isAuth: true,
  username: 'userddddddddd',
};

function reducer(state: AuthData, action: Action): AuthData {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return { ...state, ...action.payload };
    case AuthActions.LOG_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const AuthContext: Context<AuthContextValue> = createContext<AuthContextValue>({
  ...initialState,
  dispatch: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
