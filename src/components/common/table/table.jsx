import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import PropTypes from 'prop-types'

const Table = ({ children, ...rest }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...rest} />
          <TableBody {...rest} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  children: PropTypes.array
}

export default Table
