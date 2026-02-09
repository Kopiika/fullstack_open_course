import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import blogs from './services/blogs';

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		notification: notificationReducer
	}
})

export default store
