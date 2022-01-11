import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.sevice'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { generateAuthError } from '../utils/generateAuthError'
import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequasted: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequastFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequastSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      const userIndex = state.entities.findIndex((u) => u._id === state.auth.userId)
      state.entities[userIndex] = { ...state.entities[userIndex], ...action.payload }
    },
    authRequasted: (state) => {
      state.error = null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequasted,
  usersReceived,
  usersRequastFailed,
  authRequastSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed
} = actions

const authRequasted = createAction('users/authRequasted')
const userCreateRequasted = createAction('users/userCreateRequasted')
const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequasted = createAction('users/userUpdateRequasted')
const updateUserFailed = createAction('users/updateUserFailed')

export const login =
  ({ payload, redirect }) =>
    async (dispatch) => {
      const { email, password } = payload
      dispatch(authRequasted())

      try {
        const data = await authService.login({ email, password })
        dispatch(authRequastSuccess({ userId: data.localId }))
        localStorageService.setTokens(data)
        history.push(redirect)
      } catch (error) {
        const { code, message } = error.response.data.error
        if(code === 400) {
          const errorMessage = generateAuthError(message)
          dispatch(authRequestFailed(errorMessage))
        } else {
          dispatch(authRequestFailed(error.message))
        }
      }
    }

export const signUp =
  ({ email, password, ...rest }) =>
    async (dispatch) => {
      dispatch(authRequasted())
      try {
        const data = await authService.register({ email, password })
        localStorageService.setTokens(data)
        dispatch(authRequastSuccess({ userId: data.localId }))
        dispatch(
          createUser({
            _id: data.localId,
            email,
            rate: getRandomInt(1, 5),
            completedMeetings: getRandomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
              .toString(36)
              .substring(7)}.svg`,
            ...rest
          })
        )
      } catch (error) {
        dispatch(authRequestFailed(error.message))
      }
    }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequasted())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequasted())
  try {
    console.log(payload)
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(updateUserFailed(error.message))
  }
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequasted())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequastFailed(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) => {
  return state.users.entities 
    ? state.users.entities.find((u) => u._id === state.users.auth.userId) 
    : null
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}

export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getAuthError = () => (state) => state.users.error

export default usersReducer
