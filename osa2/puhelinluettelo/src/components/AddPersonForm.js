import React from 'react'
import personService from '../services/Persons'


const AddPersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setError }) => {
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const findPerson = persons.find((person) => person.name === newName)

    if (findPerson !== undefined) {
      alert(
        `${newName} is already added to phonebook; replace existing number?`
      )

      personService
        .update(findPerson.id, personObject)
        .then((input) => {
          setPersons(
            persons.map((person) =>
              person.id !== findPerson.id ? person : input
            )
          )
        setMessage(`updated ${findPerson.name}'s number`)
        })
        .catch((error) => {
          setError(true)
          setMessage(`${findPerson.name} has already been removed`)
        })
      setTimeout(() => {
        setMessage(null)
      }, 3500)

    } else {
      personService.create(personObject).then((personObject) => {
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")
        setError(false)
        setMessage(`added ${personObject.name}`)
      })
      .catch((error) => {
        setError(true)
        setMessage(error.response.data.error)
      })
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }
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