import React from 'react'

const Filter = (props) => {
    const newSearch = props.newSearch
    const searchChange = props.searchChange
    return (
      <div>
        filter shown with:
    <input
          value={newSearch}
          onChange={searchChange}
        />
      </div>
    )
  }

export default Filter