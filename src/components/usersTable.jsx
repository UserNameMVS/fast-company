import React from 'react'
import PropTypes from 'prop-types'
import BookMark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'

function UsersTable({ users, onBookMark, onDelete, ...rest }) {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => <BookMark status={user.bookmark} onClick={() => onBookMark(user._id)} />
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          Delete
        </button>
      )
    }
  }

  return <Table {...{ columns, data: users, ...rest }} />
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UsersTable
