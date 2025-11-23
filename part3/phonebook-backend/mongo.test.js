const mongoose = require('mongoose')

// Підключає бібліотеку dotenv і
// Завантажує всі змінні з файлу .env у process.env
require('dotenv').config() 

// Вимикає "строгий режим" для фільтрації у Mongoose
mongoose.set('strictQuery',false)

// Підключення до бази
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message)
  })





//mongoose.connect(url) mongoose.connect(url)

// Схема документа
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Модель
const Note = mongoose.model('Note', noteSchema)

/*Створення запису
const note = new Note({
  content: 'HTML is easy',
  important: true,
})*/


/* Збереження документа
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

//показати всі нотатки (але не створювати нові)
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/* обмежити пошук (лише важливі нотатки) 
  Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
})
*/ 
