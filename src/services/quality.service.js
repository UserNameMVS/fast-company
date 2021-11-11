import httpService from './https.service'

const qualitiesEndPoint = 'quality/'

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualitiesEndPoint)
    return data
  }
}

export default qualityService