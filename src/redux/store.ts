import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootReducer} from "./reducers.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>