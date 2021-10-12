import React from 'react'

import PropTypes from 'prop-types'

const Progress = ({ name, percent, color, image }) => {
  return (
    <div>
      <div className="d-flex">
        <h3>{name}</h3>
        <img
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain'
          }}
          src={image}
          alt=""
        />
      </div>
      <div className="progress">
        <div
          className={`progress-bar ${color}`}
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100">
          {`${percent}%`}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  color: 'bg-primary'
}

Progress.propTypes = {
  name: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default Progress
