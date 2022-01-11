import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequasted: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequastFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequasted,
  commentsReceived,
  commentsRequastFailed,
  commentCreated,
  commentDeleted
} = actions

const commentCreateRequasted = createAction('comments/commentCreateRequasted')
const commentDeleteRequasted = createAction('comments/commentDeleteRequasted')
const createCommentFailed = createAction('comments/createCommentFailed')
const deleteCommentFailed = createAction('comments/deleteCommentFailed')

export function createComment(payload) {
  const comment = {
    ...payload.data,
    _id: nanoid(),
    pageId: payload.userId,
    userId: payload.currentUserId,
    created_at: Date.now()
  }
  return async function (dispatch) {
    dispatch(commentCreateRequasted())
    try {
      const { content } = await commentService.create(comment)
      dispatch(commentCreated(content))
    } catch (error) {
      dispatch(createCommentFailed(error.message))
    }
  }
}

export function deleteComment(id) {
  return async function (dispatch) {
    dispatch(commentDeleteRequasted())
    try {
      const { content } = await commentService.delete(id)
      if (content === null) {
        dispatch(commentDeleted(id))
      }
    } catch (error) {
      dispatch(deleteCommentFailed(error.message))
    }
  }
}

export const loadCommentsList = (id) => async (dispatch) => {
  dispatch(commentsRequasted())
  try {
    const { content } = await commentService.get(id)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequastFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
