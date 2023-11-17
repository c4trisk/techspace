import { addReview, getReviewsByVenue } from '../models/reviewModel'
import { verifyToken } from '../authentication/auth'
import express from 'express'

const router = express.Router()

router.post('/', verifyToken, addReview)

router.get('/:venueId', getReviewsByVenue)

export default router
