import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '../../components/common/form/textField'
import { useAuth } from '../../hooks/useAuth'
import { useProfessions } from '../../hooks/useProfession'
import { useQualities } from '../../hooks/useQualities'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import MultiSelectField from '../common/form/multiSelectField'
import RadioField from '../common/form/radioField'
import SelectField from '../common/form/selectField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })
  const { qualities } = useQualities()
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const { professions } = useProfessions()
  const [errors, setErrors] = useState({})
  const { signUp } = useAuth()

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
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    },
    licence: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      }
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
    const isValid = validate()
    if (!isValid) return
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    try {
      await signUp(newData)
      history.push('/')
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
      <SelectField
        label="Выбери свою профессию"
        name="profession"
        defaultOption="Choose..."
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        label="Укажите ваш пол"
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Wooden', value: 'wooden' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Качества"
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}>
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto mb-2" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
