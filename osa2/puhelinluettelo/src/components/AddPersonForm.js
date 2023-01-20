import React from 'react'

const AddPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

      const findPerson = 
        persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        if(findPerson !== undefined) {
          window.alert(`${newName} is already added to phonebook`)
        }

        else {
          setPersons(persons.concat(personObject))   
        }
        setNewName('')
        setNewNumber('')
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