import { configureStore } from '@reduxjs/toolkit'
import { messagesReducer } from './messages/messagesSlice'
import { postsReducer } from './posts/postsSlice'

export const store = configureStore({
 reducer: {
  messages: messagesReducer,
  posts: postsReducer,
 },
})
