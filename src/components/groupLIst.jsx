import React from 'react'
import PropTypes from 'prop-types'
import { isArray } from 'lodash'

const GroupList = ({ items, selectedItem, valueProperty, contentProperty, onItemSelect }) => {
  const professions = isArray(items) ? items : Object.values(items)

  return (
    <ul className="list-group">
      {professions.map((item) => (
        <li
          key={item[valueProperty]}
          className={'list-group-item ' + (selectedItem === item ? 'active' : '')}
          role="button"
          onClick={() => {
            onItemSelect(item)
          }}>
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object
}

export default GroupList
