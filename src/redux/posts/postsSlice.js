import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import config from '../../configs/Configs.json'
import { Auth } from '../../components/shared/Auth'

const { API__SERVER } = config
const { userID } = new Auth()

const initialState = {
 posts: [],
 loading: 'idle',
 changeTogglePosts: false,
}

export const postsSlice = createSlice({
 name: 'posts',
 initialState,
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(fetchPosts.fulfilled, (state, action) => {
    state.posts = action.payload
    state.loading = 'successed'
   })
   .addCase(fetchPosts.pending, (state, action) => {
    state.loading = 'pending'
   })
   .addCase(addLikePost.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
 },
})

export const postsSelector = (state) => state.posts
export const postsReducer = postsSlice.reducer

export const fetchPosts = createAsyncThunk(
 'posts/fetchPostStatus',
 async (groupId) => {
  const { data } = await axios.get(
   `${API__SERVER}/forum/group/${groupId}/1/10/${userID}`
  )

  return data.list_posts
 }
)

export const addLikePost = createAsyncThunk(
 'posts/addLikePost',
 async (postId) => {
  const res = await axios.post(
   `${API__SERVER}/forum/favorite/${userID}/${postId}`
  )
 }
)
