import { JwtPayload } from "jsonwebtoken";
import { NewBooking } from "../../../types";
import { jwtDecode } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  _id: string
}

const createBookingAsync = async (bookingData: NewBooking) => {
  
  const token = localStorage.getItem('token')
  
  if(token) {
    const decodedToken = jwtDecode(token) as DecodedToken
    
    const modifiedData = {
      ...bookingData,
      customerId: decodedToken._id
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`
      },
      body: JSON.stringify(modifiedData),
    }
  
    const res = await fetch('http://localhost:8080/api/bookings', options)
  
    if(!res.ok) throw new Error('Something went wrong when creating booking')
  
    return res.json()
  }

  return
}

const getBookingsAsync = async () => {

  const token = localStorage.getItem('token')

  if(!token) return

  const decodedToken = jwtDecode(token) as DecodedToken
  
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer${token}`
    }
  }

  const res = await fetch('http://localhost:8080/api/bookings/user/' + decodedToken._id, options)
  if(!res.ok) throw new Error('Something went wrong')
  return res.json()
}

const bookingsService = {
  createBookingAsync,
  getBookingsAsync
}

export default bookingsService