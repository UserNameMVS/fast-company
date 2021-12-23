import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from './useAuth'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import commentService from '../services/comment.service'

const CommentsContex = React.createContext()

export const useComments = () => {
  return useContext(CommentsContex)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [comments, setComments] = useState()
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [userId])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now()
    }

    try {
      const { content } = await commentService.create(comment)
      setComments((prevState) => ({ ...prevState, content }))
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.get(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteComment(id) {
    try {
      const { content } = await commentService.delete(id)
      setComments(prevState => prevState.filter(c => c._id !== id))
      console.log(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <CommentsContex.Provider value={{ comments, createComment, isLoading, deleteComment }}>
      {children}
    </CommentsContex.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
