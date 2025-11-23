import { useEffect, useState } from 'react'
import personServices  from './services/persons'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

/* Main App component */

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState({message: null, type: ''})

  /*useEffect to load initial data from the server*/
  useEffect(()=>{
    personServices
    .getAll()
    .then(initialPersons => {setPersons(initialPersons)})
    .catch(error => {
      setNotification({
          type: 'error',
          message: `Failed to fetch initial data from server`
      })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    })
  }, [])
  
  /* Function to add a new person or update an existing person's number */
  const addPerson = (event) => {
    event.preventDefault()
    /* do not add an empty name */ 
    if (!newName.trim() || !newNumber.trim()) {
      setNotification({
        type: 'error',
        message: `You can not leave empty fields`
      })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)  
      return
    }
    /* Check if the person already exists */
    const existingPerson = persons.find(person=>person.name===newName)

    if(existingPerson){
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        /* Create an updated person object with the new number */
        const updatedPerson = {...existingPerson, number: newNumber}

      /* Update the person's number on the server */
      personServices
        .update(existingPerson.id , updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `${returnedPerson.name} number is updated`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            // Validation error
            setNotification({
              type: 'error',
              message: error.response.data.error
            })
          } else {
            // Person missing from server
          setNotification({
              type: 'error',
              message: `Information of '${existingPerson.name}' has already been removed from server`
          })
          setPersons(persons.filter(n => n.id !== existingPerson.id))
          }
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)  
          
        })
      } 
      return
    }
    /* Create a new person object */
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    
    personServices
      .create(personObject)
      .then(returnedPerson => {
        console.log('Returned from server:', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `${returnedPerson.name} is added to the phonebook`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })

      .catch(error => {
        // Mongoose ValidationError
        console.log('Validation error:', error.response.data.error)
        if (error.response && error.response.data && error.response.data.error) {
            setNotification({
              type: 'error',
              message: error.response.data.error
            })
            setTimeout(() => setNotification({ message: null, type: '' }), 5000)
          } else {
            console.error(error)
          }
  })
  }

  /* Function to remove a person by id */
  const removePerson = (id) =>{
    /* Find a person by id */
    const person = persons.find(person => person.id === id)
    /* Asking for confirmation from the user */
    if (window.confirm(`Delete ${person.name}?`)) {
        personServices
        .remove(id)
        .then(() => {
          /* Updating the status (create a new array without the deleted person) */
          setPersons(persons.filter(p=> p.id !== id))
          setNotification({
            message: `${person.name} is removed from the phonebook`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => {
          setNotification({
            type: 'error',
            message:`Persone '${person.name}' has already been removed from server`
          })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)  
          setPersons(persons.filter(n => n.id !== id))
        })
        
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) =>{
    setFilterText(event.target.value)
  }

  const personsToShow = persons.filter(person=> 
    person.name.toLowerCase().includes(filterText.toLowerCase()))


  return (
    <>
      <div className='mainContainer'>
        <h1>Phonebook</h1>
        <Notification notification={notification} />
        <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange}/>
        <h2>Add a new</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <h2>Numbers</h2>
        <PersonsList persons={personsToShow} removePerson={removePerson}/>
      </div>
    </>
  )
}

export default App
