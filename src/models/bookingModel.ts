import Booking from "../schemas/bookingSchema";
import express from 'express'


// Add Booking

export const addBooking = async (req: express.Request, res: express.Response) => {

  const { customerId, venue, date, startTime, endTime, attendees, cateringAdded, subTotal, totalHours, billingInformation } = req.body

  const booking = await Booking.create({
    customerId,
    venue,
    date,
    startTime,
    endTime,
    attendees,
    cateringAdded,
    subTotal,
    totalHours,
    billingInformation,
  })

  if(!booking) res.status(500).json({ message: 'Something went wrong when creating booking' })

  res.status(201).json(booking)

}

// Get Bookings

export const getBookings = async (req: express.Request, res: express.Response) => {

  const bookings = await Booking.find()
   .populate({ path: 'venue', select: 'venueName address location images squareMeters amenities contactInformation' })


  if(!bookings) res.status(500).json({ message: 'Something went wrong when getting bookings' })

  res.status(200).json(bookings)
}

// Get Booking By Id

export const getBookingById = async (req: express.Request, res: express.Response) => {
  
  const booking = await Booking.findById(req.params.id)
    .populate({ path: 'venue', select: 'venueName address location images squareMeters amenities contactInformation' })


  if(!booking) res.status(404).json({ message: 'Could not find booking' })

  res.status(200).json(booking)
}

// Get Bookings By User

export const getBookingsByUser = async (req: express.Request, res: express.Response) => {

  const bookings = await Booking.find({ customerId: req.params.id })
    .populate({ path: 'venue', select: 'venueName address location images squareMeters amenities contactInformation' })

  if(!bookings) res.status(404).json({ message: 'Could not find bookings' })

  res.status(200).json(bookings)
}
