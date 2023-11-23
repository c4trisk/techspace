import { JwtPayload } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode"

interface DecodedToken extends JwtPayload {
  _id: string
}

const addLikeAsync = async (venueId: string) => {
  
  const token = localStorage.getItem('token')
  if(!token) return

  const decodedToken = jwtDecode(token) as DecodedToken

  const like = {
    user: decodedToken._id,
    venue: venueId
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
    },
    body: JSON.stringify(like),
  }

  const res = await fetch('http://localhost:8080/api/likes', options)
  if(!res.ok) throw new Error('Something went wrong when creating like')

  return res.json()
}


const removeLikeAsync = async (venueId: string) => {
  
  const token = localStorage.getItem('token')
  if(!token) return

  const decodedToken = jwtDecode(token) as DecodedToken

  const like = {
    user: decodedToken._id,
    venue: venueId
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
    },
    body: JSON.stringify(like),
  }

  const res = await fetch('http://localhost:8080/api/likes', options)
  if(!res.ok) throw new Error('Something went wrong when deleting like')

  return { removedLikeId: venueId }
}


const getLikesAsync = async () => {

  const token = localStorage.getItem('token')
  if(!token) return

  const decodedToken = jwtDecode(token) as DecodedToken

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
    },
  }

  const res = await fetch('http://localhost:8080/api/likes/' + decodedToken._id, options)
  if(!res.ok) throw new Error('Something went wrong when getting likes')
  
  return res.json()
}


const likesService = {
  addLikeAsync,
  removeLikeAsync,
  getLikesAsync
}

export default likesService