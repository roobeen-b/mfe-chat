import { createSlice } from "@reduxjs/toolkit";

import initialState from "./initState";
import { updateLocalStorage } from "../../utils/storageHelpers";

export const extraSlice = createSlice({
    name: "extra",
    initialState,
    reducers: {
        resetExtraState: () => initialState,

        setLocaleValue: (state, action) => {
            const localeValue = action.payload;
            document.documentElement.lang = localeValue;
            state.locale = localeValue;
            updateLocalStorage("locale", localeValue, "set");
        },
        setConvoDetails: (state, action) => {
            state.convoRelatedDetails = action.payload;
        },
        toggleConvoRelatedModal: (state, action) => {
            state.convoRelatedModal = action.payload;
        },
    },
});

export const {
    setLocaleValue,
    resetExtraState,
    setConvoDetails,
    toggleConvoRelatedModal,
} = extraSlice.actions;
export default extraSlice.reducer;
