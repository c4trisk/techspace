import express from 'express'
import { addVenue, deleteVenue, getFilteredVenues, getVenueBySlug, getVenues, updateVenue } from '../models/venueModel'

const router = express.Router()

router.post('/', addVenue)

router.get('/', getVenues)
router.get('/filtered', getFilteredVenues)
router.get('/:slug', getVenueBySlug)

router.put('/:id', updateVenue)

router.delete('/:id', deleteVenue)

export default router