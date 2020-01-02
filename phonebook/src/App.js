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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} searchChange={handleSearchChange} />
      <Add persons={persons} newName={newName} newNumber={newNumber}
        setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
        changeName={handleNameChange} changeNumber={handleNumberChange} />

      <h2>Numbers</h2>
      <Rows persons={persons} newSearch={newSearch} />

    </div>
  )
}


const Filter = (props) => {
  const newSearch = props.newSearch
  const searchChange = props.searchChange
  return (
    <div>
      filter shown with:
  <input
        value={newSearch}
        onChange={searchChange}
      />
    </div>
  )
}


const Rows = (props) => {
  const persons = props.persons
  const newSearch = props.newSearch
  const rows = () => {
    console.log("newSearch in rows: ", newSearch)
    console.log("persons in rows: ", persons)
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
  return rows()
}

const Add = (props) => {
  const persons = props.persons
  const newName = props.newName
  const newNumber = props.newNumber
  const setPersons = props.setPersons
  const setNewName = props.setNewName
  const setNewNumber = props.setNewNumber
  const changeName = props.changeName
  const changeNumber = props.changeNumber

  console.log('Personlist in Add: ', persons)

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
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
    <input
            value={newName}
            onChange={changeName}
          />
        </div>
        <div>
          number:
    <input
            value={newNumber}
            onChange={changeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
export default App