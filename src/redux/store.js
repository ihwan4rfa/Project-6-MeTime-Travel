import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userLoggedReducer from "./slice/userLoggedSlice";

const rootReducer = combineReducers({
    userLogged: userLoggedReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;