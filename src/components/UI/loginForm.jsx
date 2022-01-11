import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { login, getAuthError } from '../../store/users'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const loginError = useSelector(getAuthError())
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' }
    },
    password: {
      isRequired: { message: 'Необходимо указать пароль' }
    }
  }

  useEffect(() => validate(), [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)

    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = history.location.state ? history.location.state.from.pathname : '/'
    dispatch(login({ payload: data, redirect }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Эл.почта"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}

export default LoginForm
