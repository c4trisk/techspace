
const getBookingByIdAsync = async (id: string) => {

  const token = localStorage.getItem('token')

  if(!token) return
  
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer${token}`
    }
  }


  const res = await fetch('http://localhost:8080/api/bookings/' + id, options)
  if(!res.ok) throw new Error('Something went wrong when getting order')
  return res.json()
}

const bookingService = {
  getBookingByIdAsync
}

export default bookingService