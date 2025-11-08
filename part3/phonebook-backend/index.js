const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
	{ 
	  "id": "1",
	  "name": "Arto Hellas", 
	  "number": "040-123456"
	},
	{ 
	  "id": "2",
	  "name": "Ada Lovelace", 
	  "number": "39-44-5323523"
	},
	{ 
	  "id": "3",
	  "name": "Dan Abramov", 
	  "number": "12-43-234345"
	},
	{ 
	  "id": "4",
	  "name": "Mary Poppendieck", 
	  "number": "39-23-6423122"
	}
]
 
 //Middleware Перетворює JSON в JS-об’єкт
 app.use(express.json())

 //Активувати middleware Morgan
 morgan.token('body', (req) => {
	return req.method === 'POST' ? JSON.stringify(req.body) : ''
 })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors({
	origin: 'http://localhost:5173'
 }))

 app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	const count = persons.length
	const date = new Date()

	response.send(`
		<p>Phonebook has info for ${count} people</p>
		<p>${date}</p>
	`)
 })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
	 response.json(person)
  } else {
	 response.statusMessage = "Page can not be found";
	 response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
	 return response.status(400).json({
		error: 'name or number missing',
	 })
  } 
  
  const nameExists = persons.find(person => person.name === body.name)
  if(nameExists) {
	return response.status(400).json({
		error: 'name must be unique',
	 })
  }

  const person = {
	 id: Math.floor(Math.random() * 1000000).toString(), // випадковий id
	 name: body.name,
	 number: body.number,
  }

  // додаємо новий об’єкт person у кінець масиву persons, 
  // не змінюємо старий масив напряму, а створюємо нову копію
  persons = persons.concat(person)

  response.json(person)
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