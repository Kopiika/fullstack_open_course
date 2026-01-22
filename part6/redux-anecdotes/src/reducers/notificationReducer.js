import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationReducer.actions
// Thunk for showing a notification for a limited time
export const showNotification = (message, duration = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }
}
export default notificationReducer.reducer