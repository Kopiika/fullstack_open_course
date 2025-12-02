const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

/*const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
 }*/

// PUT update blog
blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const updatedBlog = {
		title: body.title,
		author: body.author,
    	url: body.url,
    	likes: body.likes,
	}
 
	const result = await Blog.findByIdAndUpdate(
		request.params.id,
		updatedBlog,
		{new: true, runValidators: true}
	)
	if (result){
		response.json(result)
    } else {
      response.status(404).end()
    }
 })

// POST a new blog
blogsRouter.post('/', async (request, response) => {
		const body = request.body

		// token from middleware
		const token = request.token
		if (!token) {
			return response.status(401).json({ error: 'token missing' })
		 }

		 let decodedToken
		 try {
			decodedToken = jwt.verify(token, process.env.SECRET)
		 } catch (error) {
			return response.status(401).json({ error: 'token invalid' })
		 }

		// Find user from token
		const user = await User.findById(decodedToken.id)

		if (!user) {
			return response.status(400).json({ error: 'userId missing or not valid' })
		}

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
blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndDelete(request.params.id)
			if (blog) {
				response.status(204).end()
			} else {
				response.status(404).end()
			}
})

module.exports = blogsRouter