import { Venue } from "../types"
import VenueCard from "./VenueCard"
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface TestimonialCardProps {
  venue: Venue
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ venue }) => {

  

  return (
    <div className='TestimonialCard'>
      <div className="venue">
        <VenueCard venue={venue} />
      </div>
      <div className="column">
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FaRegStar />
        </div>
        <p className="heading-3">“Impressive space for innovation. Modern, well-equipped, and spacious for 20 people. The price may be a bit steep, but it's worth it for important meetings. Easy booking and attentive staff. Highly recommend!”</p>
        <p className="small">Susan at Techbolag Inc.</p>
      </div>
    </div>
  )
}

export default TestimonialCard