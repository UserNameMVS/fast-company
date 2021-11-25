import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getPofessionsList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    getPofessionsList()
  }, [])

  const getProfession = (id) => {
    return professions.find((p) => p._id === id)
  }

  return (
    <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
