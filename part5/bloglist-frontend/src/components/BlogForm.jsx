import { useState } from 'react'

const BlogForm =({createBlog})=>{
	const [title, setTitle] = useState('')
   const [author, setAuthor] = useState('')
   const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
  
		createBlog({
		  title,
		  author,
		  url
		})
  
		setTitle('')
		setAuthor('')
		setUrl('')
	 }

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={addBlog} >
				<label>
					Title:
					<input 
						value={title}
						onChange={({target})=> setTitle(target.value)} />
				</label>
				<label>
					Author:
					<input 
						value={author} 
						onChange={({ target }) => setAuthor(target.value)} />
				</label>
				<label>
					Url:
					<input 
						value={url} 
						onChange={({ target }) => setUrl(target.value)} />
				</label>
				
				<button type="submit">Create</button>
    		</form>
		</div>
	)
	 
}

export default BlogForm;