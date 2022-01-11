import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from '../UI/qualities'
import Table from '../common/table/'
import { Link } from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({ users, onBookMark, ...rest }) => {
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
    professions: {
      path: 'profession',
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => <BookMark status={user.bookmark} onClick={() => onBookMark(user._id)} />
    }
  }

  return <Table {...{ columns, data: users, ...rest }} />
}

UsersTable.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onBookMark: PropTypes.func.isRequired
}

export default UsersTable
