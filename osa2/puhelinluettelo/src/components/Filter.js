import React from 'react'


const Filter = ({ setNewFilter, newFilter }) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>filter shown with: <input 
      value={newFilter} 
      onChange={handleFilterChange} />
    </div>
  )
}

export default Filter