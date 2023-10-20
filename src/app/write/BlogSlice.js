"use client";

import { useRouter } from "next/navigation";

const { createSlice, createAsyncThunk,  } = require("@reduxjs/toolkit");

const initialState = {
  status: "idle",
  error: null,
};

let router = useRouter

 export const WriteBlogAsync = createAsyncThunk(
  "blog/riteBlog",
  async ({ formData, alert,audio }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });
    let Blogpost = await res.json()
      console.log( response, "response");
      if (response.ok) {
        alert.success(`blog published  `);
        audio.play();
        setTimeout(()=>{
          router.push(`/posts/${Blogpost.post._id}`)
        },2000)

      }
    } catch (error) {
      rejectWithValue(error);
      alert.error("blog failed to publish");
    }
  }
);


export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WriteBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(WriteBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export default BlogSlice.reducer;
export const getStatus = (state) => state.blog.status;
