import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import extraReducer from "./extraSlice";

const reducer = combineReducers({
    auth: authSlice,
    extra: extraReducer,
});

export { reducer };
