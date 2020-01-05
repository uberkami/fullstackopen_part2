import React from 'react'
import Button from './Button'

const Rows = (props) => {

    const persons = props.persons
    // const setPersons = props.setPersons
    const newSearch = props.newSearch
    const deleteNumber = props.deleteNumber
    let listToShow = []
    const rows = () => {
        if (newSearch === '') {
            listToShow = persons
        } else {
            const searchList = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()))
            if (searchList.length === 0) {
                return (
                    <div >
                        Person with the name {newSearch} was not found!
            </div>)
            } else {
                listToShow = searchList
                }
        }
        return (
            listToShow.map(person =>
                <div key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => deleteNumber(person)} key={person.id}>delete</button>
                </div>
            ))
    }
    return rows()
}

export default Rows