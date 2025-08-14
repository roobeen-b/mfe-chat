import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initState";

export const coreSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        toggleAuthModal: (state, action) => {
            state.isAuthModalOpen = action.payload;
        },
    },
});

export const { resetAuthState, setUser, setToken, toggleAuthModal } =
    coreSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default coreSlice.reducer;
