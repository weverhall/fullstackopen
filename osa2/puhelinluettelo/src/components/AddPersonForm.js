import React from 'react'
import personService from '../services/Persons'


const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        persons.find(person => person.name === newName)
            ? alert(`${newName} is already added to phonebook`)
            : personService
                .create(personObject)
                .then(personObject => {
                    setPersons(persons.concat(personObject))
                    setNewName('')
                    setNewNumber('')
                }
            )
        }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default AddPersonForm