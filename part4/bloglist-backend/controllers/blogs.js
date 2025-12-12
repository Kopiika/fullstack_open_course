const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username: 1, name: 1})
  	response.json(blogs)
})

// GET a blog by ID
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
		if (blog) {
			response.json(blog)
		} else {
			response.status(404).end()
		}
})

// PUT update blog
blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const updatedBlog = {
		title: body.title,
		author: body.author,
    	url: body.url,
    	likes: body.likes,
		user: body.user
	}
 
	const result = await Blog.findByIdAndUpdate(
		request.params.id,
		updatedBlog,
		{new: true, runValidators: true}
	).populate('user', { username: 1, name: 1 })
	if (result){
		response.json(result)
    } else {
      response.status(404).end()
    }
 })

// POST a new blog
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
		const body = request.body
		const user = request.user

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user._id
		})

	 	const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		response.status(201).json(savedBlog)
	})
	 
// DELETE a blog by ID
blogsRouter.delete(
	'/:id', 
	middleware.userExtractor, 
	async (request, response) => {
		const blog = await Blog.findById(request.params.id)
			if (!blog) {
				return response
				.status(404)
				.json({ error: 'blog not found' })
				.end()
			}
		 
			if (blog.user.toString() !== request.user._id.toString()) {
			  return response
			  .status(401)
			  .json({ error: 'only the creator can delete this blog' })
			}
		 
			await blog.deleteOne()
			response.status(204).end()
})

module.exports = blogsRouter