import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'

function QualitiesList({ qualities }) {
  return (
    <>
      {qualities.map((quality) => (
        <Qualitie key={quality._id} color={quality.color} name={quality.name} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default QualitiesList
