import React, { useContext } from 'react'
import '../navbar/Navbar.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';




const Navbar = () => {
  
  const {  user } = useContext(AuthContext);

  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color:'inherit',textDecoration:"none"}}>
            <span className="logo">TripyBooking</span>
          </Link>
           { user ? <h2 style={{fontSize:"22px",letterSpacing:"1px",fontWeight:400}}>{user.username}</h2> : ( <div className="navItems">
                <button className='navButton'>Register</button>
                <button className='navButton'>Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar