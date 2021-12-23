import React from 'react'
import UserCard from '../../UI/userCard'
import QualitiesCard from '../../UI/qualitiesCard'
import MeetingsCard from '../../UI/meetingsCard'
import Comments from '../../UI/comments'
import { useUser } from '../../../hooks/useUsers'
import PropTypes from 'prop-types'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = ({ id }) => {
  const { getUserById } = useUser()

  const user = getUserById(id)

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
