import Venue, { VenueDocument } from '../schemas/venueSchema'
import express from 'express'


// Add Venue

export const addVenue = async (req: express.Request, res: express.Response) => {
  const {
    venueName,
    address,
    location,
    capacity,
    squareMeters,
    description,
    technicalEquipment,
    amenities,
    furnitureArrangements,
    images,
    pricingInformation,
    ratingCount,
    ratingAvg,
    contactInformation,
  } = req.body;
  
  const venue: VenueDocument = await Venue.create({
    venueName,
    address,
    location,
    capacity,
    squareMeters,
    description,
    technicalEquipment,
    amenities,
    furnitureArrangements,
    images,
    pricingInformation,
    ratingCount,
    ratingAvg,
    contactInformation,
  }) 

  if(!venue) res.status(500).json({ message: 'Something went wrong when creating new venue' })

  res.status(201).json(venue)
}

// Get All Venues
export const getVenues = async (req: express.Request, res: express.Response) => {

  const venues = await Venue.find()

  if(!venues) res.status(500).json({ message: 'Something went wrong when getting venues' })

  res.status(200).json(venues)
}

// Get filtered venues
export const getFilteredVenues = async (req: express.Request, res: express.Response) => {

  const { date, location, attendees, price, catering, breakoutRooms } = req.query

  const query: any = {}

  if(location) {
    query.location = location
  }
  if(attendees) {
    const [minCapacity, maxCapacity] = (attendees as string).split('-').map(Number)
    query.capacity = { $gte: minCapacity, $lte: maxCapacity }
  }
  if(price) {
    const [minPrice, maxPrice] = (price as string).split('-').map(Number)
    query['pricingInformation.pricePerHour'] = { $gte: minPrice, $lte:maxPrice }
  }
  if(catering) {
    if(catering === 'true') {
      query['amenities.catering'] = true
    } 
  }
  if(breakoutRooms) {
    if(breakoutRooms === 'true') {
      query['amenities.breakoutRooms'] = true
    }
  }
  
  const venues = await Venue.find(query)

  if(!venues || venues.length === 0) res.status(404).json({ message: 'Something went wrong when getting venues' })

  res.status(200).json(venues)
}



// Get Venue By Slug
export const getVenueBySlug = async (req: express.Request, res: express.Response) => {

  const venue = await Venue.findOne({ slug: req.params.slug })

  if(!venue) res.status(404).json({ message: 'Could not find venue' })

  res.status(200).json(venue)
}


// Update Venue
export const updateVenue = async (req: express.Request, res: express.Response) => {

  const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if(!venue) res.status(404).json({ message: 'Could not find venue' })

  res.status(200).json(venue)

}


//* Delete Venue
export const deleteVenue = async (req: express.Request, res: express.Response) => {

  const venue = await Venue.findByIdAndDelete(req.params.id)

  if(!venue) res.status(404).json({ message: 'Could not find venue' })

  res.status(204).json(venue)
}