import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import useToggle from '../../../hooks/useToggle'
import toastOptions from '../../../utils/toastOptions'
import "react-toastify/dist/ReactToastify.css"
import '../forms.sass'
import eyeIcon from '../../../assets/eyeIcon.svg'

interface IErrors {
    username: string
    password: string
}

const LoginForm = ({ props }: any) => {

    const navigate = useNavigate()

    const [isPasswordShowing, setIsPasswordShowing] = useToggle()

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validate={values => {
                    const errors = {} as IErrors

                    if (values.username.length === 0) {
                        errors.username = "Username is required"
                    }

                    if (values.password.length === 0) {
                        errors.password = "Password is required"
                    }

                    return errors
                }}

                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { username, password } = values

                        const { data } =
                            await axios.post(loginRoute, {
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
                        onSubmit={handleSubmit}
                        method="POST"
                    >
                        <>
                            <div id="logo-container">
                                <h1> ng.cash </h1>
                            </div>

                            <div>
                                <p>Username:</p>
                                <Field
                                    required
                                    id='username'
                                    placeholder='Username'
                                    type='username'
                                    name='username'
                                    title='Please enter your username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                            </div>
                            {errors.username !== undefined &&
                                <div className='error-container'>
                                    <p>{errors.username}</p>
                                </div>}


                            <div id='password-field'>
                                <p>Password:</p>
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
                            {errors.password !== undefined &&
                                <div className='error-container'>
                                    <p>{errors.password}</p>
                                </div>}

                            <button type="submit" title='Login' disabled={isSubmitting}> LOGIN </button>
                            <p
                                id='hasnt-registered'
                                onClick={() => props[0] ? props[1](false) : props[1](true)}
                            > Não possui um cadastro? </p>
                        </>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </>
    )
}

export default LoginForm
