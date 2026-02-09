import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import blogs from './services/blogs';
import { useReducer } from 'react';

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		notification: notificationReducer,
		user: userReducer
	}
})

export default store
