import express from 'express'
import { addBooking, getBookingById, getBookings, getBookingsByUser } from '../models/bookingModel'
import { verifyToken } from '../authentication/auth'

const router = express.Router()

// Create
router.post('/', addBooking)

// Read
router.get('/', getBookings)
router.get('/:id', verifyToken, getBookingById)
router.get('/user/:id', verifyToken, getBookingsByUser)



export default router