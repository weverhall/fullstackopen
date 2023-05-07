import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Show from './components/Show'
import Filter from './components/Filter'
import personService from './services/Persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
      setPersons(data)}
      )
    }, [])

  return (   
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <Notification message={message} error={error} />

      <h2>Add</h2>
      <AddPersonForm persons={persons} setPersons={setPersons} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber} 
        setMessage={setMessage} setError={setError} />

      <h2>Numbers</h2>
      <Show persons={persons} setPersons={setPersons}
        setMessage={setMessage} setError={setError} newFilter={newFilter} />
    </div>
  )
}

export default App