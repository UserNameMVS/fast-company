import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './navProfile'

function navBar() {
  const { currentUser } = useAuth()

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className="nav mb-4">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex me-3">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default navBar
