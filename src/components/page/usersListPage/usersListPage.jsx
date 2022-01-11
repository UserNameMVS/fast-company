import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { paginate } from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import Pagination from '../../common/pagination'
import SearchField from '../../UI/searchField'
import SearchStatus from '../../UI/searchStatus'
import UsersTable from '../../UI/usersTable'
import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions'
import { getUsers, getCurrentUserId } from '../../../store/users'

const UsersListPage = () => {
  const users = useSelector(getUsers())
  const professions = useSelector(getProfessions())
  const isLoadingProfessions = useSelector(getProfessionsLoadingStatus())
  const currentUserId = useSelector(getCurrentUserId())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 8

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })

    console.log(newArray)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setSearchQuery('')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSearch = ({ target }) => {
    setSearchQuery(target.value)
    setSelectedProf()
  }

  function filterUsers(data) {
    return (
      searchQuery
        ? data.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : selectedProf
          ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
          : data
    ).filter((u) => u._id !== currentUserId)
  }

  const sortedUsers = _.orderBy(filterUsers(users), [sortBy.path], [sortBy.order])

  const usersCrop = paginate(sortedUsers, currentPage, pageSize)

  const clearFilter = () => setSelectedProf()

  const count = filterUsers(users).length

  return (
    <>
      <div className="d-flex">
        {professions && !isLoadingProfessions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button
              className="btn btn-secondary mt-2"
              disabled={!selectedProf}
              onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column flex-grow-1 me-3">
          <SearchStatus count={count} />
          <SearchField value={searchQuery} onSearch={handleSearch} />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              selectedSort={sortBy}
              onSort={handleSort}
              onBookMark={handleToggleBookMark}
            />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

UsersListPage.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default UsersListPage
