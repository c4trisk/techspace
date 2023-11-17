import { useState, useEffect } from "react"
import { User } from "../types"
import { login } from "../store/features/auth/authSlice"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuthForm } from "../hooks/useAuthForm"
import FormInput from "../components/FormInput"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)


  const [formData, setFormData] = useState<User>({
    email: '',
    password: ''
  })

  const { errors, form, submitted, handleChange, handleSubmit } = useAuthForm(formData, login)
  
  useEffect(() => {

    if(user !== null) {
      localStorage.setItem('token', user)
      navigate(state?.from || '/profile')
    }

  }, [submitted, user])



  return (
    <div className='Login'>
      <div className="modal">
        <h2 className='header-1'>Login</h2>
        <h3 className='small'>Welcome back to TechSpace!</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormInput 
            id= 'email'
            type= 'text'
            label= 'Email'
            errorMessage={errors.email}
            value={form.email}
            onChange={handleChange}
          />
          <FormInput 
            id= 'password'
            type= 'password'
            label= 'Password'
            errorMessage={errors.password}
            value={form.password}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>

        <p>Not a member?</p>
        <NavLink to='/signup'>Sign up here</NavLink>
      </div>
    </div>
  )
}

export default Login