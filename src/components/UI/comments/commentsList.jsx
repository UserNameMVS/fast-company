import React from 'react'
import Comment from './comment'

import PropTypes from 'prop-types'

const CommentsList = ({ userId, comments, ...rest }) => {
  if (comments) {
    const sortedComments = comments.sort((a, b) => b.created_at - a.created_at)
    const count = comments.length

    return (
      <>
        {count > 0 && (
          <div className="card mb-3">
            <div className="card-body ">
              <h2>Comments</h2>
              <hr />
              {sortedComments.map((comment) => (
                <Comment key={comment._id} comment={comment} {...rest} />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }

  return 'Loading...'
}

CommentsList.propTypes = {
  userId: PropTypes.string.isRequired,
  comments: PropTypes.array
}

export default CommentsList
