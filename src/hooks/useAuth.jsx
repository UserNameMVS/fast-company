import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService, { setTokens } from '../services/localStorage.service'
import { useHistory } from 'react-router-dom'

const AuthContext = React.createContext()

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const history = useHistory()
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

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

  async function getUserData() {
    try {
      setLoading(true)
      const { content } = await userService.getCurrentUser()
      setUser(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data)
      console.log(content)
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
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
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

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + 0.5)
  }

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()
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

  function logOut() {
    setUser(null)
    history.push('/')
    localStorageService.removeAuthData()
  }

  const updateUserData = async (data) => {
    try {
      const { content } = await userService.update(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut, updateUserData }}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
