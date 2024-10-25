import React, { useContext } from 'react'
import '../sidebar/Sidebar.scss'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";

import { IoIosNotifications } from "react-icons/io";
import { ImSoundcloud2 } from "react-icons/im";
import { SiLogstash } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext';


const Sidebar = () => {


    const {dispatch}=useContext(DarkModeContext)


  return (
    <div className='sidebar'>
        <div className="top">
            <Link to='/' style={{textDecoration:"none"}}>
            <span className='logo'>Admin</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <MdDashboard className="icon" /> 
                    <span>Dashboard</span>
                </li>
                <p className="title">LISTS</p>
                <Link to='/users' style={{textDecoration:"none"}}>
                <li>
                    <FaUser className="icon" />
                    <span>Users</span>
                </li>
                </Link>
                <Link to='/hotels' style={{textDecoration:"none"}}>
                <li>
                    <MdOutlineProductionQuantityLimits className="icon" />
                    <span>Hotels</span>
                </li>
                </Link>
                <Link to='/rooms' style={{textDecoration:"none"}}>
                <li>
                    <FaWallet className="icon" />
                    <span>Rooms</span>
                </li>
                </Link>
                <li>
                    <TbTruckDelivery className="icon" />
                    <span>Delivery</span>
                </li>
                <p className="title">USEFUL</p>
                <li>
                    <IoStatsChartSharp className="icon" />
                    <span>Stats</span>
                </li>
                <li>
                    <IoIosNotifications className="icon" />
                    <span>Notifications</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                    <ImSoundcloud2 className="icon" />
                    <span>System Health</span>
                </li>
                <li>
                    <SiLogstash className="icon" />
                    <span>Logs</span>
                </li>
                <li> 
                    <IoSettings className="icon" />
                    <span>Settings</span>
                </li>
                <p className="title">USER</p>
                <li>
                    <CgProfile className="icon" />
                    <span>Profile</span>
                </li>
                <li>                   
                    <IoLogOut className="icon" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar