import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import { useSelector, useDispatch } from 'react-redux'
import {
  getQualitiesLoadingStatus,
  getQualitiesByIds,
  loadQualitiesList
} from '../../../store/qualities'

function Qualities({ qualities }) {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualitiesList.map((qual) => {
        return <Qualitie key={qual._id} {...qual} />
      })}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array
}

export default Qualities
