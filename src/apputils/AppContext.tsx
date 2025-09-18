/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer, type ReactNode } from "react";

export type dispatchDataType = {
  type: string;
  payload: any;
};
export type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  refresh: boolean;
  navBarIndex: number;
};

const initState: contextType = {
  dispatch: () => {},
  refresh: false,
  navBarIndex: 0,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setRefresh":
      return {
        ...state,
        refresh: action?.payload,
      };
    case "setNavBarIndex":
      return {
        ...state,
        navBarIndex: action?.payload,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ refresh, navBarIndex }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        refresh,
        navBarIndex,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
