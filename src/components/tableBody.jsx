import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'

function TableBody({ data, columns }) {
  const renderItem = (item, column) => {
    const component = columns[column].component
    if (component) {
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    return _.get(item, columns[column].path)
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>
              {column === 'name' ? (
                <Link to={`/users/${item._id}`}>{renderItem(item, column)}</Link>
              ) : (
                renderItem(item, column)
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableBody
