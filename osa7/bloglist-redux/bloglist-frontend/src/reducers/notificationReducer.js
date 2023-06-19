import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  error: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const { message, error } = action.payload
      return {
        message: message,
        error: error,
      }
    },
    removeNotification() {
      return {
        message: null,
        error: null,
      }
    },
  },
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, error, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification({ message, error }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
