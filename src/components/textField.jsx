import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : ' is-valid')
  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? 'test' : type}
          id={name}
          value={value}
          name={name}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={toggleShowPassword}>
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default TextField
