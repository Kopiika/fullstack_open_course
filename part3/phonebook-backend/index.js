// Підключає бібліотеку dotenv і
// Завантажує всі змінні з файлу .env у process.env
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
 
 //Middleware Перетворює JSON в JS-об’єкт
 app.use(express.json())

 //Активувати middleware Morgan
 morgan.token('body', (req) => {
	return req.method === 'POST' ? JSON.stringify(req.body) : ''
 })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

 // GET all persons
app.get('/api/persons', (request, response) => {
	Person.find({})
		.then(persons => response.json(persons))
		.catch(error => {
			console.error(error)
			response.status(500).end()
	 })
})

// GET person by ID
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
	.then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => {
		console.log(error)
		response.status(400).send({ error: 'malformatted id' })
	})
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
	 return response.status(400).json({
		error: 'name or number missing',
	 })
  } 
  
  Person.findOne({name:body.name})
  .then(existingPerson =>{
	if(existingPerson) {
		return response.status(400).json({
			error: 'name must be unique',
		 })
	  }
  
  const person = new Person ({
	 name: body.name,
	 number: body.number,
  })

 return person.save()
 .then(savedPerson => response.status(201).json(savedPerson))
})	

})


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})