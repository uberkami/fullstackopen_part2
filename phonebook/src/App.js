import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-1234567' },
    { name: 'maleck', phoneNumber: '1234567' },
    { name: 'Lulu', phoneNumber: '123456' },
    { name: 'Lilia', phoneNumber: '123' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearchName] = useState('')

  const addName = (event) => {
    const nameIncluded = persons.filter((person) => person.name === newName)
    const numberIncluded = persons.filter((person) => person.phoneNumber === newNumber)

    console.log("name included? ", nameIncluded)

    event.preventDefault()
    const nameObject = {
      name: newName,
      date: new Date().toISOString(),
      phoneNumber: newNumber,
      id: persons.length + 1,
    }
    if (nameIncluded.length >= 1) {
      alert(`${newName} is already added to phonebook`)

    } else if (numberIncluded.length >= 1) {
      alert(`${numberIncluded[0].name} has already the number ${newNumber}`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    console.log("handleNameChange ", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("handleNumberChange ", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log("handleSearchChange ", event.target.value)
    setSearchName(event.target.value)
  }

  const rows = () => {
    console.log("newSearch: ", newSearch)
    if (newSearch === '') {
      return (
        persons.map(person =>
          <div key={person.name}>
            {person.name} {person.phoneNumber}
          </div>
        ))
    } else {
      const searchList = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))
      if (searchList.length === 0) {
        return (
          <div >
            Person with the name {newSearch} was not found!
  </div>)
      } else {
        return (
          searchList.map(person =>
            <div key={person.name}>
              {person.name} {person.phoneNumber}
            </div>
          ))
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
      <input
          value={newSearch}
          onChange={handleSearchChange}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App