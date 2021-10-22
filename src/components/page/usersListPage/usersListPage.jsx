import React, { useState, useEffect } from 'react'
import api from '../../../api'
import GroupList from '../../common/groupList'
import UsersTable from '../../UI/usersTable'
import Pagination from '../../common/pagination'
import SearchStatus from '../../UI/searchStatus'
import SearchField from '../../UI/searchField'
import { paginate } from '../../../utils/paginate'
import _ from 'lodash'
import PropTypes from 'prop-types'

const UsersListPage = () => {
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

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => setSelectedProf()

    const count = filteredUsers.length

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
            <SearchField value={searchQuery} onSearch={handleSearch} />
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

UsersListPage.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default UsersListPage
