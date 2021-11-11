import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQuality } from '../../../hooks/useQuality'

function Qualities({ qualities }) {
  const { isLoading, getQuality } = useQuality()

  return (
    <>
      {!isLoading
        ? qualities.map((id) => {
          const { color, name } = getQuality(id)
          return <Qualitie key={id} color={color} name={name} />
        })
        : 'Loading...'}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array
}

export default Qualities
