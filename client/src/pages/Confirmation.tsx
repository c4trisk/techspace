import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="Confirmation">
      <FaRegCheckCircle className='icon' />
      <div className="flex-column">
        <h1 className="heading-1">Thank You for Booking With TechSpace!</h1>
        <p className="small">You will receive a confirmation email to your account email, or you can view the details of your booking right here on your profile.</p>
      </div>
      <Link to='/profile'><button className="btn-primary">View Booking Details</button></Link>
    </div>
  )
}

export default Confirmation