import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import io from 'socket.io-client'
import axios from 'axios'
import { Auth } from '../../components/shared/Auth'
import config from '../../configs/Configs.json'

const { API__SERVER } = config
const { userID } = new Auth()
const socket = io('https://api.iudi.xyz')

const initialState = {
 messages: [],
 //  loading: 'idle',
 postToggle: false,
 historyMessages: [],
}

export const messagesSlice = createSlice({
 name: 'messages',
 initialState,
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(fetchMessages.fulfilled, (state, action) => {
    state.messages = action.payload
   })
   .addCase(fetchHistoryMessages.fulfilled, (state, action) => {
    state.historyMessages = action.payload
   })
   .addCase(postMessage.fulfilled, (state, action) => {
    state.postToggle = !state.postToggle
   })

   .addCase(deleteMessage.fulfilled, (state, action) => {
    state.postToggle = !state.postToggle
   })
 },
})

export const messagesSelector = (state) => state.messages
export const messagesReducer = messagesSlice.reducer

export const fetchMessages = createAsyncThunk(
 'messages/fetchMessageStatus',
 async (otherUserId) => {
  const { data } = await axios.get(
   `${API__SERVER}/pairmessage/${userID}?other_userId=${otherUserId}`
  )

  return data.data.sort((a, b) => a.MessageID - b.MessageID)
 }
)

export const postMessage = createAsyncThunk(
 'messages/postMessageStatus',
 async (data) => {
  const res = await socket.emit('send_message', data)
 }
)

export const fetchHistoryMessages = createAsyncThunk(
 'messages/fetchHistory',
 async () => {
  const { data } = await axios.get(`${API__SERVER}/chat/${userID}`)
  return data.data
 }
)

export const deleteMessage = createAsyncThunk(
 'messages/deleteMessage',
 async (messageID) => {
  const res = await fetch(`${API__SERVER}/chat/${userID}`, {
   method: 'delete',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    messageId: messageID,
   }),
  })
 }
)
