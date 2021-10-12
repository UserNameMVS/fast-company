import React from 'react'
import PropTypes from 'prop-types'

function TableHeader({ selectedSort, onSort, columns }) {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const handleSortPointer = (currentColumn) => {
    if (selectedSort.path === currentColumn) {
      if (selectedSort.order === 'asc') {
        return (
          <span>
            <i className="bi bi-caret-down-fill"></i>
          </span>
        )
      } else {
        return (
          <span>
            <i className="bi bi-caret-up-fill"></i>
          </span>
        )
      }
    }
    return null
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            {...{ role: columns[column].path && 'button' }}
            scope="col">
            {columns[column].name}
            {columns[column].path && handleSortPointer(columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
