import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import { isOutdate } from '../utils/isOutdate'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequasted: (state) => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequastFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequasted, professionsReceived, professionsRequastFailed } = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions

  if (isOutdate(lastFetch)) {
    dispatch(professionsRequasted())
    try {
      const { content } = await professionService.get()
      dispatch(professionsReceived(content))
    } catch (error) {
      dispatch(professionsRequastFailed(error.message))
    }
  }
}

export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === professionId)
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading

export default professionsReducer
