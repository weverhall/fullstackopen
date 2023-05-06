import React from 'react'
import personService from '../services/Persons'


const Show = ({persons, newFilter, setPersons}) => {
    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(newFilter))

    const handleClick = (id, name) => () => {
        if (window.confirm(`delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {setPersons(persons.filter(person => person.id !== id))}
            )
        }
    }

    return (
        <div>
        {personsToShow.map(person => 
            <div key={person.name}>
                {person.name} {person.number} 
                <button onClick={handleClick(person.id, person.name)}>delete</button>
            </div>)}
        </div>
    )
}

export default Show