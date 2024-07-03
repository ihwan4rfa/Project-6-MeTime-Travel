import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
};

export const userLoggedSlice = createSlice({
    name: "userLogged",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;