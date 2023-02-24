import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  isAsyncThunkAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { playlistReducer, userReducer } from "./slice";
import { ThunkDispatch } from "redux-thunk";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  playlist: playlistReducer

});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();