import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'
import { isOutdate } from '../utils/isOutdate'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequasted: (state) => {
      state.isLoading = true
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequastFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesReceived: qualitiesRecieved, qualitiesRequastFailed, qualitiesRequasted } = actions

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities

  if (isOutdate(lastFetch)) {
    dispatch(qualitiesRequasted())
    try {
      const { content } = await qualityService.fetchAll()
      dispatch(qualitiesRecieved(content))
    } catch (error) {
      dispatch(qualitiesRequastFailed(error.message))
    }
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const qual of state.qualities.entities) {
        if (qual._id === qualId) {
          qualitiesArray.push(qual)
          break
        }
      }
    }

    return qualitiesArray
  }

  return []
}

export default qualitiesReducer
