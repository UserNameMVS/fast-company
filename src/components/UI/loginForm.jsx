import React, { useEffect, useState } from 'react'
import TextField from '../../components/common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useLogin } from '../../hooks/useLogin'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const { signIn } = useLogin()
  const history = useHistory()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен не корректно' }
    },
    password: {
      isRequired: { message: 'Необходимо указать пароль' },
      isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одну цифру' },
      min: { message: 'Длинна пароля должна быть не меннее 8 символов', value: 8 }
    }
  }

  useEffect(() => validate(), [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)

    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(data)
      history.push('/users')
    } catch (error) {
      setErrors(error)
    }
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
      <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}

export default LoginForm
