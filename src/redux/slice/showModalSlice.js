import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    modal: false,
};

export const showModalSlice = createSlice({
    name: "showModal",
    initialState,
    reducers: {
        setShowModal: (state, action) => {
            state.modal = action.payload;
        },
    }
});

export const { setShowModal } = showModalSlice.actions;
export default showModalSlice.reducer;