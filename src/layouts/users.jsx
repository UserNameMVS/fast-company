import React from 'react'
import UserPage from '../components/userPage'
import UsersList from '../components/usersList'
import { useParams } from 'react-router-dom'

const UsersPage = () => {
  const params = useParams()
  const { userId } = params
  return userId ? <UserPage id={userId} /> : <UsersList />
}

export default UsersPage
