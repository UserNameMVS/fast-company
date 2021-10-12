import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import Qualitie from './qualitie'
import { Link } from 'react-router-dom'

function UserPage({ id }) {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data)
    })
  }, [])

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        {user.qualities.map((quality) => (
          <Qualitie key={quality._id} color={quality.color} name={quality.name} />
        ))}
        <div>completedMeetings: {user.completedMeetings}</div>
        <h2>Rate: {user.rate}</h2>
        <button>
          <Link style={{ textDecoration: 'none', color: '#000' }} to="/users">
            Все пользователи
          </Link>
        </button>
      </>
    )
  }

  return 'Loading...'
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage
