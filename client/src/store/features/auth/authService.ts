import { User } from "../../../types";


const loginAsync = async (payload: User) => {
  const user = {
    email: payload.email,
    password: payload.password
  }

  const res = await fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if(!res.ok) throw new Error('Something went wrong when logging in')

  return res.json()
}

const signupAsync = async (payload: User) => {
  const user = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
  }

  const res = await fetch('http://localhost:8080/api/users/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if(!res.ok) throw new Error('Something went wrong when logging in')

  return res.json()
}

const authService = {
  loginAsync,
  signupAsync
}

export default authService