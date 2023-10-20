import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../component/authLinks/AuthSlice";
import blogReducer from "../app/write/BlogSlice";
import postReducer from "../component/cardList/PostsSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    post:postReducer
  },
});
