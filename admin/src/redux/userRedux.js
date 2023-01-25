import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isFetching: false,
        currentUser: null,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
        },
        loginFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        }
    }
})

export const { loginFailure, loginStart, loginSuccess } = userSlice.actions;
export default userSlice.reducer;