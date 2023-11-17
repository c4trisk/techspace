import express from 'express'
import cors from 'cors'
import userController from './controllers/userController';
import venueController from './controllers/venueController'
import bookingController from './controllers/bookingController'
import likesController from './controllers/likesController'
import reviewController from './controllers/reviewController'


const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


// Routes
app.use('/api/users', userController)
app.use('/api/venues', venueController)
app.use('/api/bookings', bookingController)
app.use('/api/likes', likesController)
app.use('/api/reviews', reviewController)

export default app