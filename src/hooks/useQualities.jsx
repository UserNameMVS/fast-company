import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  useEffect(() => {
    const getQualitiesList = async () => {
      try {
        const { content } = await qualityService.fetchAll()
        setQualities(content)
        setLoading(false)
      } catch (error) {
        errorCatcher(error)
      }
    }

    getQualitiesList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id)
  }

  return (
    <QualitiesContext.Provider value={{ qualities, isLoading, getQuality }}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default QualitiesProvider
