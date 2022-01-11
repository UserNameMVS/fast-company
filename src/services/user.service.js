import httpService from './https.service'
import localStorageService from './localStorage.service'

const userEndPoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndPoint + payload._id, payload)
    return data
  },
  post: async () => {
    const { data } = await httpService.post(userEndPoint)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(userEndPoint + localStorageService.getUserId())
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndPoint + localStorageService.getUserId(),
      payload
    )
    return data
  }
}

export default userService
