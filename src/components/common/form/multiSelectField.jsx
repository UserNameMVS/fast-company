import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({ options, onChange, name, label, qualities }) => {
  const handleChange = (value) => {
    onChange({ name, value })
  }

  const selectedQualities =
    Array.isArray(qualities) && typeof qualities === 'object'
      ? Object.keys(qualities).map((optionName) => ({
        label: qualities[optionName].name,
        value: qualities[optionName]._id
      }))
      : ''

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
        label: options[optionName].name,
        value: options[optionName]._id
      }))
      : options

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        options={optionsArray}
        className="basic-multi-select mb-4"
        classNamePrefix="select"
        name={name}
        defaultValue={selectedQualities}
        onChange={handleChange}
        closeMenuOnSelect={false}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  qualities: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
}

export default MultiSelectField
