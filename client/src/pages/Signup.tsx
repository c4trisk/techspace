import { useState } from "react"

import { NavLink } from "react-router-dom"
import { User } from "../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { signup } from "../store/features/auth/authSlice"


const Signup = () => {

  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(formData)
    
    await dispatch(signup(formData))

  }

  return (
    <div className="Signup">
      <h2 className='header-1'>Signup</h2>
        <h3 className='small'>Welcome to TechSpace!</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} />
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input type="password" id="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
          <button>Submit</button>
        </form>

        <p>Already a member?</p>
        <NavLink to='/login'>Login here</NavLink>
    </div>
  )
}

export default Signup