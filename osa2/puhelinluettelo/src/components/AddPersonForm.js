import React from 'react'
import axios from 'axios'

const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        persons.find(person => person.name === newName)
            ? alert(`${newName} is already added to phonebook`)
            : axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => {
                setPersons(persons.concat(response.data))
        })            
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