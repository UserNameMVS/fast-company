import React from 'react'
import { Link } from 'react-router-dom'

function navBar() {
  return (
    <ul className="nav mb-4">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users">
          Users
        </Link>
      </li>
    </ul>
  )
}

export default navBar
