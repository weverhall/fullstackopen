import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  content: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const { message, content } = action.payload
      return {
        message: message,
        content: content
      }
    },
    deleteNotification(state, action) {
      return {
        message: null,
        content: null
      }
    }
  }
})

export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer