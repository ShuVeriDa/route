import {combineReducers} from "@reduxjs/toolkit";
import {routeReducer} from "./route/routeSlice.ts";

export const rootReducer = combineReducers({
    route: routeReducer,
})