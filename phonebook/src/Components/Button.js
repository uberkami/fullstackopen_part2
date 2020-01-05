import React from 'react'
import entriesService from '../services/entries'

const Button = (props) => {
    console.log('button props', props)
    const personToDelete = props.del
    const setPersons = props.setPersons
    const id = personToDelete.id
    console.log('personToDelete', personToDelete)
    const persons = props.persons
    console.log('persons in delete', persons)
  
    const deleteNumber = (personToDelete) => {
      // const changedList = persons.filter(person => person.id !== id)
      // console.log("list without delete id", changedList)
      console.log('id test', id)
      console.log('delete person', personToDelete)
      entriesService
        .deletePerson(personToDelete.id)
        // .then(() => setPersons([])  ) 
        .then(setPersons(persons.filter(item => item.id !== personToDelete.id)))
    }
    return (
      <button onClick={() => deleteNumber(personToDelete)} key={id}>delete</button>
    )
  }
  export default Button