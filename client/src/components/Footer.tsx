import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'
import { SiKlarna } from 'react-icons/si'
import { FaCcVisa, FaPaypal } from 'react-icons/fa'
import logoOutline from '../assets/techspace-logo-white.png'

const Footer = () => {
  return (
    <div className="Footer">
      <div className="nav">
        <div>
          <Link to='/'><img className="logo" src={logoOutline} alt="TechSpace Logo" /></Link>
        </div>
        <ul className="footer-links">
          <li><NavLink to='/venues' className='footer-link heading-3'>All Venues</NavLink></li>
          <li><NavLink to='/venues' className='footer-link heading-3'>About Us</NavLink></li>
          <li><NavLink to='/' className='footer-link heading-3'>Contact</NavLink></li>
          <li><NavLink to='/' className='footer-link heading-3'>Log in</NavLink></li>
        </ul>
        <div className="some-links">
          <AiFillInstagram />
          <AiFillFacebook/>
        </div>
      </div>
      <div className="divider"></div>
      <div className="payment-options">
        <FaCcVisa />
        <FaPaypal />
        <SiKlarna />
      </div>
      <p className="small">&copy; All Rights Reserved.</p>
    </div>

  )
}

export default Footer