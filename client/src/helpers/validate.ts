import { User } from "../types";


export const validate = (authFormData: User, setErrors: Function) => {
  
  const err: any = {}

  if(authFormData.email.trim() === '') {
    err.email = 'You need to enter an email address'
  }

  setErrors(err)
  return Object.keys(err).length <= 0
}