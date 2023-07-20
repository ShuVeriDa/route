import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRoute} from "../../types/types.ts";
import {LatLngTuple} from "leaflet";
import {routes} from "../routes.ts";

export interface IRootState {
  currentRoute: IRoute;
  polyline: LatLngTuple[][] | LatLngTuple[] | [];
  error: string | null;
}

const initialState: IRootState = {
  currentRoute: routes[0],
  polyline: [],
  error: null,
}

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<IRoute>) => {
      state.currentRoute = action.payload;
    },
    setPolyline: (
      state,
      action: PayloadAction<LatLngTuple[][] | LatLngTuple[] | []>
    ) => {
      state.polyline = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const routeReducer = routeSlice.reducer

export const {
  setCurrentRoute,
  setPolyline,
  setError,
} = routeSlice.actions;

