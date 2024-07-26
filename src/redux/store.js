import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userLoggedReducer from "./slice/userLoggedSlice";
import showModalReducer from "./slice/showModalSlice";
import themeReducer from "./slice/themeSlice";

const rootReducer = combineReducers({
    userLogged: userLoggedReducer,
    showModal: showModalReducer,
    theme: themeReducer
});

const store = configureStore({
    reducer: rootReducer,
})

if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        store.dispatch(setUser(user));
    }
}

export default store;