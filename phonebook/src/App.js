import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Rows from './Components/Rows'
import Add from './Components/Add'
import Notification from './Components/Notification'
import entriesService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearchName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false);

  useEffect(() => {
    entriesService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch(error => {
        setError(true)
        setMessage(`Loading People from Database failed`)
      })
    setError(false)
    setMessage(`Loading People from Database successful!`)
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const deleteNumber = (personToDelete) => {
    if (window.confirm(`Are you shure you want to delete ${personToDelete.name}?`)) {
      entriesService
        .deletePerson(personToDelete.id)
        .then(setPersons(persons.filter(item => item.id !== personToDelete.id)))
        .catch(error => {
          setError(true)
          setMessage(`Deleting ${personToDelete.name} failed!`)
        })
    }
    setError(false)
    setMessage(`Deleting ${personToDelete.name} successful!`)
  }

  const newObject = {
    name: newName,
    number: newNumber
  }

  const updateNumber = (personToUpdate) => {
    if (window.confirm(`Are you shure you want to change the Number of ${personToUpdate.name} to ${newNumber}?`)) {
      entriesService
        .update(personToUpdate.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName("")
          setNewNumber("")
        }).catch(error => {
          setError(true)
          setMessage(`Updating ${personToUpdate.name}'s information failed!`)
        })
    }
    setError(false)
    setMessage(`Updating ${personToUpdate.name}'s information successful!`)
  }


  const addPerson = () => {
    entriesService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      }).catch(error => {
        setError(true)
        setMessage(`Adding ${newName} was not successful!`)
      })
    setError(false)
    setMessage(`Adding ${newName} was successful!`)
  }

  if (persons.length !== 0) {
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter newSearch={newSearch} searchChange={handleSearchChange} />
        <Add persons={persons} newName={newName} newNumber={newNumber}
          setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
          changeName={handleNameChange} changeNumber={handleNumberChange}
          updateNumber={updateNumber} addPerson={addPerson} />
        <Notification message={message} setMessage={setMessage} error={error} />
        <h2>Numbers</h2>
        <Rows persons={persons} newSearch={newSearch}
          setPersons={setPersons} deleteNumber={deleteNumber} />
      </div>
    )
  }
  else {
    return (
      <div>loading... </div>
    )
  }
}

export default App


