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
    removeNotification(state, action) {
      return {
        message: null,
        content: null
      }
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, content, seconds) => {
  return async dispatch => {
    dispatch(createNotification({ message, content }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer