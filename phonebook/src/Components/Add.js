import React from 'react'

const Add = (props) => {
    const persons = props.persons
    const newName = props.newName
    const newNumber = props.newNumber
    const addPerson = props.addPerson
    const changeName = props.changeName
    const changeNumber = props.changeNumber
    const updateNumber = props.updateNumber

    const addName = (event) => {
        const nameIncluded = persons.filter((person) => person.name === newName)
        const numberIncluded = persons.filter((person) => person.number === newNumber)
        event.preventDefault()
        if (nameIncluded.length === 1) {
            updateNumber(nameIncluded[0])
        } else if (numberIncluded.length >= 1) {
            alert(`${numberIncluded[0].name} has already the number ${newNumber}`)
        } else {
            addPerson()
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