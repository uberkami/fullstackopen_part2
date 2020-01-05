import React from 'react'
import entriesService from '../services/entries'

const Add = (props) => {
    const persons = props.persons
    const newName = props.newName
    const newNumber = props.newNumber
    const setPersons = props.setPersons
    const setNewName = props.setNewName
    const setNewNumber = props.setNewNumber
    const changeName = props.changeName
    const changeNumber = props.changeNumber
    const updateNumber = props.updateNumber
    // console.log('Personlist in Add: ', persons)
  
    const addName = (event) => {
      const nameIncluded = persons.filter((person) => person.name === newName)
      const numberIncluded = persons.filter((person) => person.number === newNumber)
  
      // console.log("name included? ", nameIncluded)
  
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      if (nameIncluded.length == 1) {

        if (window.confirm(`Are you shure you want to change the Number of ${newName} to ${newNumber}?` )){

            entriesService
            .update(nameIncluded[0].id, nameObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              setNewName("")
              setNewNumber("")
          })
        }
        // updateNumber(nameIncluded[0])
        // alert(`${newName} is already added to phonebook`)
  
      } else if (numberIncluded.length >= 1) {
        alert(`${numberIncluded[0].name} has already the number ${newNumber}`)
      } else {
        entriesService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName("")
            setNewNumber("")
          })
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

  export default Add