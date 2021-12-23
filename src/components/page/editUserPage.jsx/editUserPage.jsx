import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const { currentUser, updateUserData } = useAuth()

  if (userId !== currentUser._id) history.push(`/users/${currentUser._id}/edit`)

  const { professions, isLoading: isProfessionsLoading } = useProfessions()
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const { qualities, getQuality, isLoading: isQulitiesLoading } = useQualities()
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isQulitiesLoading && !isProfessionsLoading) {
      const { name, email, profession, sex, qualities } = currentUser
      setData({
        name,
        email,
        profession,
        sex,
        qualities: transformData(qualities.map((id) => getQuality(id)))
      })
    }
  }, [])

  function transformData(data) {
    return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  useEffect(() => {
    setLoading(false)
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { qualities } = data
    try {
      await updateUserData({
        ...currentUser,
        ...data,
        qualities: qualities.map((q) => q.value)
      })
      history.push(`/users/${currentUser._id}`)
    } catch (error) {
      setErrors(error)
    }
  }

  const validatorConfog = {
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
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
    const errors = validator(data, validatorConfog)
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  if (isLoading) return 'Loading...'

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              type='password'
              name="password"
              value={data.password || ''}
              onChange={handleChange}
              error={errors.password}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              name="profession"
              options={professionsList}
              onChange={handleChange}
              value={data.profession}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Wooden', value: 'wooden' }
              ]}
              value={data.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              defaultValue={data.qualities}
              options={qualitiesList}
              onChange={handleChange}
              values
              name="qualities"
              label="Выберите ваши качества"
            />
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
