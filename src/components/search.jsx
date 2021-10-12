import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onSearch }) => {
  return (
    <form className="d-flex mb-3">
      <input
        className="form-control"
        type="search"
        placeholder="Поиск"
        aria-label="Поиск"
        value={value}
        onChange={onSearch}
      />
    </form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default Search
