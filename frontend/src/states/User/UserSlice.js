import { createSlice } from "@reduxjs/toolkit";
const initialState = {isLogin: false, userInfo: {}};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isLogin = true;
            state.userInfo = action.payload;
        },
        userLogout: (state, action) => {
            state.isLogin = false
            state.userInfo = action.payload;
        },
        userOTP: (state, action) => {
            state.userOTP = action.payload;
        },
        userEmail: (state, action) => {
            state.userEmail = action.payload;
        }
    }
})

export const { userLogin, userLogout, userEmail, userOTP } = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer;