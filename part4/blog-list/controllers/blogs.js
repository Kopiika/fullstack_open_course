const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
  	.then(blogs => response.json(blogs))
	.catch(error => next(error))
})

// POST a new blog
blogsRouter.post('/', (request, response, next) => {
	const body = request.body
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	 })

	 blog.save()
	 	.then(savedBlog => {
		response.status(201).json(savedBlog)
	 })
	 .catch(error => next(error))
	})
	 
// DELETE a blog by ID
blogsRouter.delete('/:id', (request, response, next) => {
	Blog.findByIdAndDelete(request.params.id)
		.then(result => {
			if (result) {
				response.status(204).end()
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

module.exports = blogsRouter