import { useDispatch } from "react-redux";
import { AuthErrors, User } from "../types";
import { useState } from 'react'
import { validate } from "../helpers/validate";
import { AppDispatch } from "../store";


export const useAuthForm = (authFormData: User, action: Function) => {

  const [errors, setErrors] = useState<AuthErrors>({})
  const [form, setForm] = useState({...authFormData})
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm(formData => {
      return {
        ...formData,
        [id]: value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!validate(form, setErrors)) return

    const userData = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    if(form.firstName && form.lastName) {
       
      userData.firstName = form.firstName
      userData.lastName = form.lastName
      userData.email = form.email,
      userData.password = form.password
      
    } else {
      userData.email = form.email,
      userData.password = form.password
    }
    await dispatch(action(userData))
    setSubmitted(true)
  }

  return {
    errors,
    form,
    submitted,
    handleChange,
    handleSubmit
  }

}