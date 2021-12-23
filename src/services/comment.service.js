import httpService from './https.service'

const commentsEndPoint = 'comment/'

const commentService = {
  create: async (payload) => {
    const { data } = await httpService.put(commentsEndPoint + payload._id, payload)
    return data
  },
  get: async (pageId) => {
    const { data } = await httpService.get(commentsEndPoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  delete: async (commentId) => {
    const { data } = await httpService.delete(commentsEndPoint + commentId)
    return data
  }
}

export default commentService
