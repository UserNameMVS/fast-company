import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import SelectField from '../../common/form/selectField'
import { validator } from '../../../utils/validator'
import TextAreaField from '../../common/form/textAreaField'

const CommentForm = ({ users, onSubmit }) => {
  const [data, setData] = useState({ user: '', content: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleSubmit = () => {
    onSubmit({ content: data.content, userId: data.user })
    setData({ user: '', content: '' })
  }

  const validatorConfig = {
    user: {
      isRequired: { message: 'Выверите пользователя' }
    },
    content: {
      isRequired: { message: 'Поле обязательно для заполнения' }
    }
  }

  useEffect(() => validate(), [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)

    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <SelectField
            label=""
            name="user"
            defaultOption="Выберите пользователя"
            options={users}
            onChange={handleChange}
            value={data.user}
            error={errors.user}
          />
          <TextAreaField
            label="Сообщение"
            name="content"
            value={data.content}
            onChange={handleChange}
            error={errors.content}
            rows="3"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end p-3 pt-0">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}>
          Опубликовать
        </button>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSubmit: PropTypes.func
}

export default CommentForm
