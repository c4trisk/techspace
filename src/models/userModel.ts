import User from '../schemas/userSchema'
import bcrypt from 'bcryptjs'
import express  from 'express'
import { generateToken } from '../authentication/auth'


// Signup

export const signup = async (req: express.Request, res: express.Response) => {

  const { firstName, lastName, email, password } = req.body

  if(!email) res.status(400).json({ message: 'You need to enter an email address' })
  if(!password) res.status(400).json({ message: 'You need to enter a password' })

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const _user = new User({ firstName, lastName, email, passwordHash: hash })
  const user = await _user.save()

  if(!user) res.status(500).json({ message: 'Something went wrong when creating new user' })

  res.status(201).json(generateToken(user))
}


// Login

export const login = async (req: express.Request, res: express.Response) => {

  const { email, password } = req.body

  if(!email || !password) res.status(400).json({ message: 'You need to enter email and password' })

  const user = await User.findOne({ email })
  if(!user) res.status(401).json({ message: 'Incorrect Credentials' })
  
  const result = await bcrypt.compare(password, user.passwordHash)
  if(!result) res.status(401).json({ message: 'Incorrect Credentials' })
  
  res.status(200).json(generateToken(user))
}
