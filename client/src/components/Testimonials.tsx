import TestimonialCard from './TestimonialCard'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Testimonials = () => {

  const { venues } = useSelector((state: RootState) => state.venues)
  

  return (
    <div className='Testimonials'>
      <h3 className='heading-2'>Testimonials</h3>
      <div className="carousel">
        <TestimonialCard venue={venues[1]} />
        <TestimonialCard venue={venues[0]} />
      </div>
    </div>
  )
}

export default Testimonials