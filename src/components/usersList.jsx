import React, { useState, useEffect } from 'react'
import api from '../api'
import GroupList from './groupLIst'
import UsersTable from './usersTable'
import Pagination from './pagination'
import SearchStatus from './searchStatus'
import Search from './search'
import { paginate } from '../utils/paginate'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Users = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [users, setUsers] = useState()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

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

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const searchedUsers = searchQuery
      ? sortedUsers.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : sortedUsers

    const usersCrop = paginate(searchedUsers, currentPage, pageSize)
    const clearFilter = () => setSelectedProf()

    const count = searchedUsers.length

    return (
      <>
        <div className="d-flex">
          {professions && (
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
            <Search value={searchQuery} onSearch={handleSearch} />
            {count > 0 && (
              <UsersTable
                users={usersCrop}
                selectedSort={sortBy}
                onSort={handleSort}
                onDelete={handleDelete}
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

  return 'Loading...'
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default Users
