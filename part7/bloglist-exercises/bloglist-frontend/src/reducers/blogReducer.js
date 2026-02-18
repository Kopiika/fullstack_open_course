import blogService from '../services/blogs';
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
		setBlogs(state, action) {	
		  return action.payload.sort((a, b) => b.likes - a.likes);
		},
	 appendBlog(state, action) {
		 state.push(action.payload);
	 },
	 updateBlog(state, action) {
		 const updatedBlog = action.payload;
		 const newState = state.map((blog) =>
       blog.id === updatedBlog.id ? updatedBlog : blog
     );
		 return newState.sort((a, b) => b.likes - a.likes);
	 },
	 removeBlog(state, action) {
		const idToRemove = action.payload;
		return state.filter((blog) => blog.id !== idToRemove);
	 },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
	  const blogs = await blogService.getAll();
	 dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
	  const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update({
      ...blog,
			likes: blog.likes + 1,
			user: blog.user.id
    });
		dispatch(updateBlog(updatedBlog));
	};
};

export const addComment = (id, comment) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.addComment(id, comment)
		dispatch(updateBlog(updatedBlog)); 
	}
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
	 await blogService.remove(id);
	 dispatch(removeBlog(id));
  };
};



export default blogSlice.reducer;