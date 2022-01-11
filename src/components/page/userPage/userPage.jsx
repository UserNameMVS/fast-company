import React from 'react'
import UserCard from '../../UI/userCard'
import QualitiesCard from '../../UI/qualitiesCard'
import MeetingsCard from '../../UI/meetingsCard'
import Comments from '../../UI/comments'
import PropTypes from 'prop-types'
import { CommentsProvider } from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id))

  if (!user) return 'Loading...'

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard data={user.qualities} />
          <MeetingsCard value={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    </div>
  )
}

UserPage.propTypes = {
  id: PropTypes.string
}

export default UserPage
