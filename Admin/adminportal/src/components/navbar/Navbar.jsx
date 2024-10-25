import React, { useContext } from 'react'
import '../navbar/Navbar.scss'
import { MdLanguage } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineChatBubble } from "react-icons/md";
import { RiFullscreenExitFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { DarkModeContext } from '../../context/darkModeContext';


const Navbar = () => {

  
  const {dispatch}=useContext(DarkModeContext)


  return (
    <div className='navbar'>
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder='Search...' />
            <FaSearch />
          </div>
          <div className="items">
            <div className="item">
            <MdLanguage className='icon' />
            English
            </div>
            <div className="item">
            <MdDarkMode style={{cursor:"pointer"}} className='icon' onClick={()=>dispatch({type:"TOGGLE"})} />
            </div>
            <div className="item">
            <RiFullscreenExitFill className='icon' />
            </div>
            <div className="item">
            <IoIosNotifications className='icon' />
            <div className="counter">1</div>
            </div>
            <div className="item">
            <MdOutlineChatBubble className='icon' />
            <div className="counter">2</div>
            </div>
            <div className="item">
            <IoListOutline className='icon' />
            </div>
            <div className="item">
              <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="NO IMG" className='avatar' />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar