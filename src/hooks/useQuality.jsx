import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualityContext = React.createContext()

export const useQuality = () => {
  return useContext(QualityContext)
}

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
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

  useEffect(() => {
    getQualitiesList()
  }, [])

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const getQuality = (id) => {
    return qualities.find(q => q._id === id)
  }

  return (
    <QualityContext.Provider value={{ isLoading, getQuality }}>{children}</QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType(PropTypes.arrayOf[PropTypes.node], PropTypes.node)
}

export default QualityProvider
