import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {ReactNode, createContext, useReducer} from 'react';
import MyReducer from './AppReducer';
dayjs.extend(utc);
export interface State {
  userData: any;
  search: string;
}

interface Action {
  type: string;
  payload: any;
}

export interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const initialState: State = {
    userData: {},
    search: '',
  };

  const [state, dispatch] = useReducer(MyReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}
