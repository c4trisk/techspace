import { useState, useEffect } from "react"
import { User } from "../types"
import { login } from "../store/features/auth/authSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthForm } from "../hooks/useAuthForm"
import FormInput from "../components/FormInput"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useModal } from "../context/ModalContext"

const Login= () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)

  const { showLoginModal, setShowLoginModal, setShowSignupModal } = useModal()

  const [formData, setFormData] = useState<User>({
    email: '',
    password: ''
  })

  const { errors, form, submitted, handleChange, handleSubmit } = useAuthForm(formData, login)

  useEffect(() => {
    setShowLoginModal(true)
  }, [])
  
  useEffect(() => {
    if(user !== null) {
      localStorage.setItem('token', user)
      setShowLoginModal(false)

      navigate(state?.from || '/profile')
    }
  }, [submitted, user])

  return (
    <div className={`Login ${showLoginModal ? 'active' : ''}`}>
        <div className="close" onClick={() => setShowLoginModal(false)}>
          <p>X</p>
        </div>
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
          <div className="d-flex">
            <p className="small">Don't have an account? 
              <span className="link" onClick={()=> {
                setShowSignupModal(true)
                setShowLoginModal(false)
              }}>Sign up here.</span>
            </p>
            <button className="btn-primary">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login