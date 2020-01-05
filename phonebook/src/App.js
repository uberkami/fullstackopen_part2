import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Rows from './Components/Rows'
import Add from './Components/Add'
import entriesService from './services/entries'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    entriesService
      .getAll()
      .then(initialPersons => {
        console.log('initial persons', initialPersons)
        setPersons(initialPersons)
      })

    console.log('render inside', persons, 'persons')
    console.log('render inside', persons.length, 'personslength')
  }, [])

  console.log('render', persons.length, 'persons length')

  const handleNameChange = (event) => {
    // console.log("handleNameChange ", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log("handleNumberChange ", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // console.log("handleSearchChange ", event.target.value)
    setSearchName(event.target.value)
  }

  const deleteNumber = (personToDelete) => {
    console.log('delete person id', personToDelete)
    if (window.confirm(`Are you shure you want to delete ${personToDelete.name}?` )){
      entriesService
      .deletePerson(personToDelete.id)
      .then(setPersons(persons.filter(item => item.id !== personToDelete.id)))
    }
  }

  const updateNumber = (personToUpdate) => {
    console.log('Person to Update with number', personToUpdate.name, newNumber)
    if (window.confirm(`Are you shure you want to change the Number of ${personToUpdate.name} to ${newNumber}?` )){
      const newObject = {
        name: personToUpdate.name,
        number: newNumber
      }
      
      entriesService
      .update(personToUpdate.id, newObject)
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setNewName("")
        setNewNumber("")
    })
  }
}

  if (persons.length !== 0) {
    console.log('render inside return', persons, 'persons')
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter newSearch={newSearch} searchChange={handleSearchChange} />
        <Add persons={persons} newName={newName} newNumber={newNumber}
          setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
          changeName={handleNameChange} changeNumber={handleNumberChange} 
          updateNumber={updateNumber}/>
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


