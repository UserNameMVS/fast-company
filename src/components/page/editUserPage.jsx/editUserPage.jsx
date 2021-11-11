import React, { useState, useEffect } from 'react'
import { validator } from '../../../utils/validator'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const EditUserPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [qualities, setQualities] = useState({})
  const [professions, setProfession] = useState()
  const [errors, setErrors] = useState({})
  const history = useHistory()

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser({
        name: data.name,
        email: data.email ? data.email : '',
        profession: data.profession ? data.profession : '',
        sex: data.sex ? data.sex : 'male',
        qualities: data.qualities
      })
    })
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен не корректно' }
    }
  }

  useEffect(() => validate(), [user])

  const validate = () => {
    const errors = validator(user, validatorConfig)
    setErrors(errors)

    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  const handleChange = (target) => {
    if (target.name === 'qualities') {
      const newQulities = []
      target.value.forEach((v) => {
        Object.keys(qualities).forEach((k) => {
          if (qualities[k]._id === v.value) {
            newQulities.push(qualities[k])
          }
        })
      })
      setUser((prevState) => ({
        ...prevState,
        [target.name]: newQulities
      }))
    } else if (target.name === 'profession') {
      Object.keys(professions).forEach((p) => {
        if (professions[p]._id === target.value) {
          setUser((prevState) => ({
            ...prevState,
            [target.name]: professions[p]
          }))
        }
      })
    } else {
      setUser((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  const handleBack = () => {
    history.push(`/users/${userId}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.users.update(userId, user)
    history.push(`/users/${userId}`)
  }

  const isCreatedUser = !!Object.keys(user).length

  return (
    isCreatedUser && (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-3">
            <button
              onClick={handleBack}
              className="btn btn-primary">
              <i className="bi bi-caret-left me-1"></i>
              Назад
            </button>
          </div>
          <div className="col-md-6 shadow mt-5 p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label="Эл.почта"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                name="profession"
                defaultOption={'Choose...'}
                options={professions}
                onChange={handleChange}
                value={user.profession._id}
              />
              <RadioField
                label="Укажите ваш пол"
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Wooden', value: 'wooden' }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Качества"
                qualities={user.qualities}
              />
              <button
                className="btn btn-primary w-100 mx-auto mb-2"
                type="submit"
                disabled={!isValid}>
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default EditUserPage
