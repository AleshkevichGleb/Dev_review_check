import {combineReducers} from "redux";
import userSlice from "./user.slice.ts";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;