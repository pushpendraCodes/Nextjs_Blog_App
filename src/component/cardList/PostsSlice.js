import {
  fetchPopularPost,
  fetchPost,
  fetchPosts,
  postComment,
} from "./postApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  Popularposts: [],
  singlepost: {},
  Totalposts: 0,
  status: "idel",
  pagesize: 5,
  page: 1,
};

export const fetchPostsAsync = createAsyncThunk(
  "post/fetchposts",
  async ({ pagination, category }, { rejectWithValue }) => {
    let queryString = "";
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    if (category) {
      queryString += `category=${category}&`;
    }
    let response = await fetchPosts(queryString);
    return response;
  }
);

export const fetchPostAsync = createAsyncThunk(
  "post/fetchpost",
  async (id, { rejectWithValue }) => {
    let response = await fetchPost(id);
    return response.blogpost;
  }
);
export const fetchPopularPostAsync = createAsyncThunk(
  "post/fetchpopularPost",
  async () => {
    console.log("fetching")
    let response = await fetchPopularPost();
    console.log(response,"res")
    return response.sortedArray;
  }
);

export const postCommentAsync = createAsyncThunk(
  "post/postComment",
  async ({ updatedObject, alert,audio }, { rejectWithValue }) => {
    console.log(updatedObject, "data");
    let response = await postComment(updatedObject);

    if (response.comment) {
      alert.success(`comment added `);
      audio.play();
      return response;
    }
    return response;
  }
);

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {

        state.status = "idel";
        state.posts = action.payload.posts;
        state.Totalposts = action.payload.totalPosts;
        state.page = state.page+1
      })
      .addCase(fetchPostAsync.pending, (state, action) => {
        state.status = "post_pending";
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {

        state.status = "idel";
        state.singlepost = action.payload;
      })
      .addCase(postCommentAsync.pending, (state, action) => {

        state.status = "pending";
      })
      .addCase(postCommentAsync.fulfilled, (state, action) => {

        state.status = "idel";
        state.singlepost = action.payload.comment;
        console.log(action.payload);
      })
      .addCase(fetchPopularPostAsync.pending, (state, action) => {

        state.status = "pending";
      })
      .addCase(fetchPopularPostAsync.fulfilled, (state, action) => {
        console.log(action.payload, "payload");
        state.status = "idel";
        state.Popularposts = action.payload;
      });
  },
});

export default postsSlice.reducer;

export const getPage = (state) => state.post.page;
export const getPageSize = (state) => state.post.pagesize;
export const getPost = (state) => state.post.posts;
export const getTotalpost = (state) => state.post.Totalposts;
export const getSinglepost = (state) => state.post.singlepost;
export const getStatus = (state) => state.post.status;
export const getPopularPost = (state) => state.post.Popularposts;
