import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: false,
    },
    reducers: {
        dark: (state) => {
            document.documentElement.classList.add("dark");
            state.isDark = true;
        },
        light: (state) => {
            document.documentElement.classList.remove("dark");
            state.isDark = false;
        }
    }
});

export default themeSlice.reducer;
export const { dark, light } = themeSlice.actions;