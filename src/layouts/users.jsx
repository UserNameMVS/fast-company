import React from 'react'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { Redirect, useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage.jsx'
import UsersLoader from '../components/UI/hoc/usersLoader'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

function Users() {
  const params = useParams()
  const { userId, edit } = params
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          userId === currentUserId ? (
            <EditUserPage />
          ) : (
            <Redirect to={`/users/${currentUserId}/edit`} />
          )
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  )
}

export default Users
