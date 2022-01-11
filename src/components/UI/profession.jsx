import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionsLoadingStatus, getProfessionById } from '../../store/professions'

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById(id))
  const isLoading = useSelector(getProfessionsLoadingStatus())

  return !isLoading ? <p>{profession.name}</p> : 'Loading...'
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
