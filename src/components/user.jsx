import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  _id,
  bookmark,
  onBookMark
}) => {
  return (
    <tr id={_id}>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((quality) => (
          <Qualitie key={quality._id} color={quality.color} name={quality.name} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={bookmark} onClick={() => onBookMark(_id)} />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  onBookMark: PropTypes.func.isRequired,
  bookmark: PropTypes.bool
}

export default User
