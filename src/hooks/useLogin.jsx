import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const LoginContext = React.createContext()

const httpLogin = axios.create()

export const useLogin = () => {
  return useContext(LoginContext)
}

const LoginProvider = ({ children }) => {
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

  const signIn = async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpLogin.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorObject = {}

        if (message === 'EMAIL_NOT_FOUND') {
          errorObject.email = 'Такой адрес не зарегистрирован'
        }

        if (message === 'INVALID_PASSWORD') {
          errorObject.password = 'Неверный пароль'
        }

        throw errorObject
      }
    }
  }

  return <LoginContext.Provider value={{ signIn }}>{children}</LoginContext.Provider>
}

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default LoginProvider
