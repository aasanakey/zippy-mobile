import React from "react";
import {
  SET_TOKEN,
  SET_USER,
  UPDATE_AUTH_STATE,
  UPDATE_ORDER_SEARCH,
} from "../utils/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case UPDATE_AUTH_STATE:
      return { ...state, isAuthenticated: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case UPDATE_ORDER_SEARCH:
      return { ...state, searchResult: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const defaultState = {
  token: null,
  isAuthenticated: false,
  user: null,
  searchResult: null,
};

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

export const AppProvider =  ({ children }) => {
  const initialState =  defaultState
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  React.useEffect(() => {
    return async () => {
      await AsyncStorage.setItem('appState', JSON.stringify(state)); 
    }
  }, [])
  
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
};
