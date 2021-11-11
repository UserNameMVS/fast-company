import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from '../UI/qualities'
import Table from '../common/table/'
import { Link } from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({ users, onBookMark, onDelete, ...rest }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { name: 'Профессия', component: user => <Profession id={user.profession}/> },
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
