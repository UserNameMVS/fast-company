import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

function Table({ ...rest }) {
  return (
    <table className="table">
      <TableHeader {...rest} />
      <TableBody {...rest} />
    </table>
  )
}

export default Table
