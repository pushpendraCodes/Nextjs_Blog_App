"use client";
const { createSlice } = require("@reduxjs/toolkit");



const initialState = {
  isLogin: "",
  user: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default AuthSlice.reducer;
export const user = (state) => state.auth.user;
