import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import CommentsList, { AddCommentForm } from '../common/comments/'
import { useDispatch, useSelector } from 'react-redux'
import { loadCommentsList, getCommentsLoadingStatus, getComments } from '../../store/comments'
import { useParams } from 'react-router-dom'

const Comments = () => {
  const dispatch = useDispatch()
  const comments = useSelector(getComments())
  const isLoading = useSelector(getCommentsLoadingStatus())
  const { userId } = useParams()

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList comments={sortedComments} />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
