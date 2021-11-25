import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Qualitie = ({ id }) => {
  const { getQuality } = useQualities()

  const quality = getQuality(id)

  const getBageClasses = (color) => `badge m-2 bg-${color}`

  return <span className={getBageClasses(quality.color)}>{quality.name}</span>
}

Qualitie.propTypes = {
  id: PropTypes.string.isRequired
}

export default Qualitie
