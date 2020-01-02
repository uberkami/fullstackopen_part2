import React from 'react'

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

  export default Search