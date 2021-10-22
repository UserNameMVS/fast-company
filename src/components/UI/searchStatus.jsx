import React from 'react'
import { declOfNum } from '../../utils/declination'
import PropTypes from 'prop-types'

const SearchStatus = ({ count }) => {
  const phrase = declOfNum(count, ['человек тусанет', 'человека тусанут', 'человек тусанет'])

  return (
    <h2>
      {count === 0 ? (
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      ) : (
        <span className="badge bg-primary">
          {count} {phrase} с тобой сегодня
        </span>
      )}
    </h2>
  )
}

SearchStatus.propTypes = {
  count: PropTypes.number
}

export default SearchStatus
