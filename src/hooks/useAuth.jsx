import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const AuthContext = React.createContext()

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const createUser = async (data) => {
    try {
      const { content } = userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })

      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Такой адрес уже существует'
          }
          throw errorObject
        }
      }
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
          throw Error('Адрес почты и/или пароль указаны неверно!')
        } else {
          throw Error('Слишком много попыток входа. Попробуйте позднее')
        }
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
