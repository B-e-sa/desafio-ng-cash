import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import eyeIcon from '../../../assets/eyeIcon.svg'

import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
// import eyeIcon from '../../assets/icons/eyeIcon.svg'
import useToggle from '../../../hooks/useToggle'
import toastOptions from '../../../utils/toastOptions'
import '../forms.sass'

interface IErrors {
  username: string
  password: string
  confirmPassword: string
  undercase: string
  uppercase: string
  number: string
  specialCharacter: string
}

const RegisterForm = ({ props }: any) => {

  const navigate = useNavigate()

  const [isPasswordShowing, setIsPasswordShowing] = useToggle()

  /*
  useEffect(() => {
    if (localStorage.getItem('ng-user')) {
      navigate('/')
    }
  }, [])
  */

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
          undercase: '',
          uppercase: '',
          number: '',
          specialCharacter: ''
        }}
        validate={values => {

          const errors = {} as IErrors

          if (!values.username) {
            errors.username = "Username required"
          } else if (values.username.length < 4 || values.username.length > 20) {
            errors.username = 'Username must have 4-20 characters'
          }

          if (!values.password) {
            errors.password = 'Required'
          }

          if (!/(?=.*?[a-z])/.test(values.password)) {
            errors.undercase = 'Password requires an undercase letter'
          }

          if (!/(?=.*?[A-Z])/.test(values.password)) {
            errors.uppercase = "Password requires an uppercase letter"
          }

          if (!/(?=.*?[0-9])/.test(values.password)) {
            errors.number = "Password requires an number"
          }

          if (!/(?=.*?[!@#$%¨&*()_§º¹²³£¢¬°?|;.,"'])/.test(values.password)) {
            errors.specialCharacter = "Password requires an special character"
          }

          if (values.password.length < 8) {
            errors.password = "Password must have at least 8 characters"
          }

          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match"
          }

          return errors
        }}

        onSubmit={async (values, { setSubmitting }) => {

          try {
            const { username, password } = values

            const { data } =
              await axios.post(registerRoute, {
                username,
                password
              })

            if (data?.status === false) {
              toast.error(data.msg, toastOptions)
            } else {
              localStorage.setItem('ng-user', JSON.stringify(data.user))
              navigate('/')
            }
          } catch {
            toast.error("An error ocurred, try again later", toastOptions)
          }
          setSubmitting(false)
        }}

      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form
            id='register-form'
            onSubmit={handleSubmit}
            method="POST"
          >
            <>
              <div id="logo-container">
                <h1> ng.cash </h1>
              </div>

              <div>
                <p>Username: </p>
                <Field
                  required
                  placeholder='Username'
                  type='text'
                  name='username'
                  title='Please enter your username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </div>
              {errors.username !== undefined &&
                <div className='error-container'>
                  <p> {errors.username} </p>
                </div>}

              <div id='password-field'>
                <p>Password: </p>
                <Field
                  required
                  placeholder='Password'
                  type={isPasswordShowing ? 'text' : 'password'}
                  name='password'
                  title='Please enter your password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <img
                  id='eye-icon'
                  src={eyeIcon}
                  alt="show password"
                  onClick={setIsPasswordShowing}
                />
              </div>
              {Object.keys(errors).length !== 0 &&
                <div className='error-container'>
                  <p>{errors.specialCharacter}</p>
                  <p>{errors.undercase}</p>
                  <p>{errors.uppercase}</p>
                  <p>{errors.number}</p>
                  <p>{errors.confirmPassword}</p>
                </div>}

              <div>
                <p>Confirm password: </p>
                <Field
                  required
                  placeholder='Confirm Password'
                  type={isPasswordShowing ? 'text' : 'password'}
                  name='confirmPassword'
                  title='Please reenter your password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
              </div>

              <button type="submit" title='Create user' disabled={isSubmitting}> CREATE USER </button>

              <p
                id='hasnt-registered'
                onClick={() => props[0] ? props[1](false) : props[1](true)}
              > Already have an account? </p>
            </>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  )
}

export default RegisterForm