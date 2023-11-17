import express from 'express'
import { login, signup } from '../models/userModel'

const router = express.Router()

// Create
router.post('/signup', signup)
router.post('/login', login)


export default router