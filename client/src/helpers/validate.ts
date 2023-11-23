import { User } from "../types";


export const validate = (authFormData: User, setErrors: Function) => {

  const err: any = {}
  
  if(authFormData.firstName?.trim() === '') {
    err.firstName = 'You need to enter a name'
  } 
  
  if(authFormData.lastName?.trim() === '') {
    err.lastName = 'You need to enter a name'
  }
  
  const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  if(authFormData.email.trim() === '') {
    err.email = 'You need to enter an email address'
  } else if (!emailRegex.test(authFormData.email)) {
    err.email = 'You need to enter a valid email address'
  }
  
  if(authFormData.password.trim() === '') {
    err.password = 'You need to enter a password'
  } else if (authFormData.password.length < 3) {
    err.password = 'Your password needs to be at least 3 characters long.'
  }
  if(authFormData.repeatPassword) {
    if(authFormData.repeatPassword !== authFormData.password) {
      err.repeatPassword = 'The passwords need to match'
    }
  }
  
  setErrors(err)
  return Object.keys(err).length <= 0
}


export const validateBookingForm = (formData: any, setShowFormError: Function) => {

  const { date, attendees, startTime } = formData

  const errors: any = {}

  if (date.trim() === '') {
    errors.date = 'Please select a date'
  }

  if (attendees.trim() === '') {
    errors.attendees = 'Please enter the number of attendees'
  }

  if (startTime.trim() === '') {
    errors.startTime = 'Please select a start time'
  }

  if (Object.keys(errors).length > 0) {
    setShowFormError(true)
    return errors
  }

  setShowFormError(false)
  return null
}