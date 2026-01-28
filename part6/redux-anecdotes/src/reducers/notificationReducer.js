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
let timeoutId
export const showNotification = (message, seconds) => {
  return dispatch => {
    dispatch(setNotification(message))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}
export default notificationReducer.reducer