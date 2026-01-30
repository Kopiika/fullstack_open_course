import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const NotificationReducer = (state, action) => {
  switch (action.type) {
	 case 'SET_NOTIFICATION':
		return action.payload
	 case 'CLEAR_NOTIFICATION':
	 	return ''
	 default:
		return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, '')

  return (
	 <NotificationContext.Provider value={{ notification, notificationDispatch }}>
		{props.children}
	 </NotificationContext.Provider>
  )
}


export default NotificationContext