import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")?
    JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = { userInfo: userInfoFromStorage };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
});

export const { setCredentials,logout } = authSlice.actions;
export default authSlice.reducer;
