import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  const pages = pageCount > 1 ? _.range(1, pageCount + 1) : null

  return (
    pages && (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page} className={'page-item ' + (currentPage === page ? 'active' : '')}>
              <a onClick={() => onPageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}
export default Pagination
