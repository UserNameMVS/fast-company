import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useQualities } from '../../../hooks/useQualities'

function Qualities({ qualities }) {
  const { isLoading } = useQualities()

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualities.map((qual) => {
        return <Qualitie key={qual} id={qual} />
      })}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array
}

export default Qualities
