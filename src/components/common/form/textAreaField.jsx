import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          id={name}
          value={value}
          rows={rows}
          name={name}
          onChange={handleChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextAreaField.defaultProps = {
  type: 'text',
  rows: '3'
}

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  rows: PropTypes.string
}

export default TextAreaField
