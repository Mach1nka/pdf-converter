import { useReducer, Context, createContext, Dispatch, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

import { AuthActions, AuthData } from '../services/resources/models/auth.model';

type LogInAction = {
  type: AuthActions.LOG_IN;
  payload: Pick<AuthData, 'username'>;
};

type LogOutAction = {
  type: AuthActions.LOG_OUT;
};

type Action = LogInAction | LogOutAction;

interface AuthContextValue extends AuthData {
  dispatch: Dispatch<Action>;
}

const initialState: AuthData = {
  isAuth: false,
  username: null,
};

function reducer(state: AuthData, action: Action): AuthData {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return { ...state, isAuth: true, username: action.payload.username };
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
