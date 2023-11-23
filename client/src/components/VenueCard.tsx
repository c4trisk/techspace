import { useState, useEffect } from 'react'
import { Venue } from '../types'
import { FaStar, FaUser, FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useDispatch } from 'react-redux'
import { addLike, getLikes, removeLike } from '../store/features/likes/likesSlice'

interface VenueCardProps {
  venue: Venue
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [isVenueLiked, setIsVenueLiked] = useState(false)
  const { likedVenues } = useSelector((state: RootState) => state.likes)
  const { user } = useSelector((state: RootState) => state.auth)

  // Checking if venue is already liked
  // useEffect(() => {
  //   const checkIsVenueLiked = (venueId: string) => {
  //     return likedVenues.some((like) => like.venue === venueId)
  //   }

  //   if(venue && checkIsVenueLiked(venue._id)) {
  //     setIsVenueLiked(true)
  //   } else {
  //     setIsVenueLiked(false)
  //   }
  // }, [likedVenues, venue])

  // useEffect(() => {
  //   dispatch(getLikes())
  // }, [user])

  // const handleLikeClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, venueId: string) => {
  //   event.stopPropagation()
  //   if (!venue) return

  //   //Checking if user is logged in
  //   if(user === null){
  //     navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
  //     return
  //   } 

  //   if(isVenueLiked) {
  //     dispatch(removeLike(venueId))
  //   } else {
  //     dispatch(addLike(venueId))
  //   }
  // };


  // const handleLike = (venueId: string) => {
  //   if(!venue) return
  //   dispatch(addLike(venueId))
  // }
  
  // const handleRemoveLike = (venueId: string) => {
  //   if(!venue) return
  //   dispatch(removeLike(venueId))

  // }

  return (
    venue &&
    <div className='VenueCard'>
      <Link to={`/venues/${venue.slug}`} className='card-link'>
      <img src={venue.images[0]} alt={venue.venueName} />
      <div className="overlay"></div>
      <div className="dark-overlay"></div>
      </Link>
      <div className="like" >
        { isVenueLiked 
        ? <FaHeart />
        : <FaRegHeart />
      }
        
      </div>
      <div className="info">
        <div className="top">
          <p className='heading-3'>{venue.address}</p>
          <div className="d-flex-gap">
            <p className='small'>{venue.ratingAvg}</p>
            <FaStar />
          </div>
        </div>
        <div className="d-flex-gap">
          <FaUser />
          <p className="small">{venue.capacity}</p>
        </div>
        <p className="small">From SEK {venue.pricingInformation.pricePerHour}/h</p>
      </div>
    </div>
  )
}

export default VenueCard