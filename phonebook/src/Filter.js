import React, { useState } from 'react'

// const [newSearch, setSearchName] = useState('')

const handleSearchChange = (event) => {
    console.log("handleSearchChange ", event.target.value)
    setSearchName(event.target.value)
}

const Filter = () => {
    <div>
        filter shown with:
        <input
            value={newSearch}
            onChange={handleSearchChange}
        />
    </div>
}

export default Filter