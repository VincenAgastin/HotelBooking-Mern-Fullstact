import React from 'react'
import '../navbar/Navbar.scss'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color:'inherit',textDecoration:"none"}}>
            <span className="logo">TripyBooking</span>
          </Link>
            <div className="navItems">
                <button className='navButton'>Register</button>
                <button className='navButton'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar