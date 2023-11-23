import { useState, useEffect } from "react"
import { User } from "../types"
import { RootState } from "../store"
import { signup } from "../store/features/auth/authSlice"
import { useModal } from "../context/ModalContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthForm } from "../hooks/useAuthForm"
import { useSelector } from "react-redux"
import FormInput from "../components/FormInput"



const Signup = () => {

  const navigate = useNavigate()
  const { state } = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)
  const { setShowLoginModal, showSignupModal, setShowSignupModal } = useModal()
  

  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  
  const { errors, form, submitted, handleChange, handleSubmit } = useAuthForm(formData, signup)

  useEffect(() => {
    if(user !== null) {
      localStorage.setItem('token', user)
      setShowSignupModal(false)

      navigate(state?.from || '/')
    }
  }, [submitted, user])
  

  return (
    <div className={`Signup ${showSignupModal ? 'active' : ''}`}>
      <div className="close" onClick={() => setShowSignupModal(false)}>
          <p>X</p>
        </div>
      <div className="modal">
        <h2 className='header-1'>Sign Up</h2>
          <h3 className='small'>You're just one step away from joining the TechSpace Community!</h3>
          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="d-flex">
              <FormInput 
                id= 'firstName'
                type= 'text'
                label= 'First Name'
                errorMessage={errors.firstName}
                value={form.firstName}
                onChange={handleChange}
              />
              <FormInput 
                id= 'lastName'
                type= 'text'
                label= 'Last Name'
                errorMessage={errors.lastName}
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <FormInput 
                id= 'email'
                type= 'text'
                label= 'Email'
                errorMessage={errors.email}
                value={form.email}
                onChange={handleChange}
              />
            <div className="d-flex">
              <FormInput 
                  id= 'password'
                  type= 'password'
                  label= 'Password'
                  errorMessage={errors.password}
                  value={form.password}
                  onChange={handleChange}
                />
                <FormInput 
                  id= 'repeatPassword'
                  type= 'password'
                  label= 'Repeat Password'
                  errorMessage={errors.repeatPassword}
                  value={form.repeatPassword}
                  onChange={handleChange}
                />
            </div>
            <div className="d-flex">
              <p className="small">Already have an account? 
                <span className="link" onClick={() => {
                  setShowSignupModal(false)
                  setShowLoginModal(true)
                }}> Login here.</span>
              </p>
              <button className="btn-primary">Submit</button>
            </div>
          </form>

      </div>
    </div>
  )
}

export default Signup