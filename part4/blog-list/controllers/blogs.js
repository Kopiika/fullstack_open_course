const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
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

// POST a new blog
blogsRouter.post('/', async (request, response) => {
		const body = request.body
	
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
		})

	 	const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	})
	 
// DELETE a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndDelete(request.params.id)
			if (blog) {
				response.status(204).end()
			} else {
				response.status(404).end()
			}
})

module.exports = blogsRouter