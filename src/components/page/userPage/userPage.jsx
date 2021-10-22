import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../UI/qualities'
import { useHistory } from 'react-router-dom'
import CommentsList from '../../UI/comments/commentsList'
import CommentForm from '../../UI/comments/commentForm'

function UserPage({ id }) {
  const [user, setUser] = useState()
  const [users, setUsers] = useState()
  const [comments, setComments] = useState()
  const [commentsCrop, setCommentsCrop] = useState()

  const history = useHistory()

  const handleUserChange = () => {
    history.push(`/users/${id}/edit`)
  }

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data)
    })
  }, [])

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  useEffect(() => {
    api.comments.fetchAll().then((data) => {
      setComments(data)
    })
  })

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => {
      setCommentsCrop(data)
    })
  }, [comments])

  const handleDelete = (id) => {
    api.comments.remove(id)
    setComments(comments.filter((c) => c._id !== id))
  }

  const handleSubmit = ({ content, userId }) => {
    api.comments.add({ content, userId, pageId: id }).then((data) => {
      setComments((prevState) => [...prevState, data])
    })
  }

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <button
                  onClick={handleUserChange}
                  className="position-absolute top-0 end-0 btn btn-light btn-sm">
                  <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="150"
                    height="150"
                  />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{user.profession.name}</p>
                    <div className="text-muted">
                      <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                      <i className="bi bi-caret-up text-secondary" role="button"></i>
                      <span className="ms-2">Rate: {user.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Qualities</span>
                </h5>
                <p className="card-text">{<Qualities qualities={user.qualities} />}</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Completed meetings</span>
                </h5>
                <h1 className="display-1">{user.completedMeetings}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {<CommentForm userId={id} users={users} onSubmit={handleSubmit} />}
            {
              <CommentsList
                userId={id}
                users={users}
                comments={commentsCrop}
                onDelete={handleDelete}
              />
            }
          </div>
        </div>
      </div>
    )
  }

  return 'Loading...'
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage
