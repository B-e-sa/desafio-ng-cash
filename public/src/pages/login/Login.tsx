import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

// import eyeIcon from '../../assets/icons/eyeIcon.svg'
import useToggle from '../../hooks/useToggle'
import "react-toastify/dist/ReactToastify.css"
import LoginForm from '../../components/forms/loginForm/LoginForm'
import RegisterForm from '../../components/forms/registerForm/RegisterForm'

interface IErrors {
  username: string
  password: string
}

const Login = () => {


  const [isPasswordShowing, setIsPasswordShowing] = useToggle()
  const [userHasAnAccout, setUserHasAnAccount] = useState(true)

  /*
  useEffect(() => {
    if (localStorage.getItem('ng-user')) {
      navigate('/')
    }
  }, [])
  */

  return (
    <div id="login-page">
      {userHasAnAccout ?
        <LoginForm props={[userHasAnAccout, setUserHasAnAccount]}/>
        :
        <RegisterForm props={[userHasAnAccout, setUserHasAnAccount]}/>
      }
    </div>
  )
}

export default Login