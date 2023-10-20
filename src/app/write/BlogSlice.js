"use client";

import { useRouter } from "next/navigation";

const { createSlice, createAsyncThunk,  } = require("@reduxjs/toolkit");

const initialState = {
  status: "idle",
  error: null,
};



 export const WriteBlogAsync = createAsyncThunk(
  "blog/riteBlog",
  async ({ formData, alert,audio ,router}, { rejectWithValue }) => {

    try {
      const response = await fetch(`${process.env.API_URL}/api/posts`, {
        method: "POST",
        body: formData,
      });
    let Blogpost = await response.json()
      console.log( Blogpost,response, "response");

      if (response.ok) {
        alert.success(`blog published  `);
        audio.play();

       setTimeout(() => {
        router.push(`/posts/${Blogpost.post._id}`)
       }, 2000);



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
