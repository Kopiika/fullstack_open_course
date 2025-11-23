const mongoose = require('mongoose')

// --- Отримуємо аргументи з командного рядка ---
const args = process.argv.slice(2) // відкидаємо перші 2 елементи node і файл
if (args.length < 1) {
  console.log('Usage:')
  console.log('  node mongo.js <password>                # list all entries')
  console.log('  node mongo.js <password> <name> <num>   # add new entry')
  process.exit(1)
}

const password = args[0]
const name = args[1] // може бути undefined
const number = args[2] // може бути undefined

// --- Складання URI (замінити cluster & user на свої) ---
const uri = `mongodb+srv://fullstack:${encodeURIComponent(password)}@cluster0.hobonqu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

// Підключаємося
mongoose.connect(uri)
  .then(() => {
    // Якщо передано тільки пароль => виводимо всі записи
    if (!name && !number) {
      const personSchema = new mongoose.Schema({
        name: String,
        number: String
      })

      // Модель
      const Person = mongoose.model('Person', personSchema)

      //показати всі persons (але не створювати нові)
      Person.find({})
        .then(persons => {
          console.log('phonebook:')
          persons.forEach(p => {
            console.log(`${p.name} ${p.number}`)
          })
        })
        .catch(err => console.error('Error fetching persons:', err.message))
        .finally(() => mongoose.connection.close())
    } else if (name && number) {
      // Додати новий запис
      const personSchema = new mongoose.Schema({
        name: String,
        number: String
      })
      const Person = mongoose.model('Person', personSchema)

      const person = new Person({
        name: name,
        number: number
      })

      person.save()
        .then(saved => {
          console.log(`added ${saved.name} number ${saved.number} to phonebook`)
        })
        .catch(err => console.error('Error saving person:', err.message))
        .finally(() => mongoose.connection.close())
    } else {
      console.log('If you want to add an entry, provide both name and number.')
      mongoose.connection.close()
    }
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })
