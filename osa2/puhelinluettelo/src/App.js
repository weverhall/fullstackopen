import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Show from './components/Show'
import Filter from './components/Filter'
import personService from './services/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(getPersons => {
      setPersons(getPersons)}
      )
    }, [])

  return (   
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />

      <h2>Add</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Show persons={persons} newFilter={newFilter} setPersons={setPersons} />
    </div>
  )
}

export default App