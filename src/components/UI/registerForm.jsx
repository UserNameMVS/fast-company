import React, { useEffect, useState } from 'react'
import TextField from '../../components/common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import MultiSelectField from '../common/form/multiSelectField'
import RadioField from '../common/form/radioField'
import SelectField from '../common/form/selectField'
import { useSelector, useDispatch } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { getProfessions } from '../../store/professions'
import { signUp } from '../../store/users'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const qualities = useSelector(getQualities())
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professions = useSelector(getProfessions())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' },
      min: { message: 'Длинна имени не может быть меннее 3 символов', value: 3 }
    },
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
    dispatch(signUp(newData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
        options={professionsList}
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
