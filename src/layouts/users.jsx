import React from 'react'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage.jsx'

function UsersPage() {
  const params = useParams()
  const { userId, edit } = params
  return userId ? edit ? <EditUserPage /> : <UserPage id={userId} /> : <UsersListPage id={userId} />
}

export default UsersPage
