import React from 'react'
import { Link } from 'react-router-dom'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

function navBar() {
  const isLoggedIn = useSelector(getIsLoggedIn())

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className="nav mb-4">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex me-3">
          {isLoggedIn ? (
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
