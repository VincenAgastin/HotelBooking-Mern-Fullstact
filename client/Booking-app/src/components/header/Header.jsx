import React, { useContext, useState } from 'react'
import '../header/Header.scss'
import { RiHotelBedFill } from "react-icons/ri";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { FaCarAlt } from "react-icons/fa";
import { MdOutlineAttractions } from "react-icons/md";
import { BsTaxiFront } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { Navigate, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';


const Header = ({type}) => {

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [destination,setDestination]=useState("")

  const [openDate,setOpenDate]=useState(false)
  const [openOptions,setOpenOptions]=useState(false)
  const [options,setOptions]=useState({
    adult:1,
    children:0,
    room:1
  });

  const navigate=useNavigate()

  const { dispatch } = useContext(SearchContext); 


  const handleSearch=()=>{
    dispatch({
      type: "NEW_SEARCH",
      payload: {  destination,  dates,  options },
  });
    navigate('/hotels',{state:{destination,dates,options}})
  }


  const handleOption=(name,operation)=>{
    setOptions((prev)=>{
      return {
        ...prev,[name]:operation==="i" ? options[name]+1:options[name]-1
      }
    })
  }


  return (
    <div className='header'>
       <div  className={type==='list' ? "headerContainer listMode" : "headerContainer"}>
       <div className="headerList">
            <div className="headerLiseItem active">
            <RiHotelBedFill  />
            <span>Stays</span>
            </div>
            <div className="headerLiseItem">
            <PiAirplaneInFlightFill />
            <span>Flights</span>
            </div>
            <div className="headerLiseItem">
            <FaCarAlt  />
            <span>Car rentals</span>
            </div>
            <div className="headerLiseItem">
            <MdOutlineAttractions  />
            <span>Attractions</span>
            </div>
            <div className="headerLiseItem">
            <BsTaxiFront  />
            <span>Airport taxis</span>
            </div>
        </div>
       { type !== 'list' &&
        <> <h1 className="headerTitle">A Lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
            Get reward for your travels -  unlock instant savings of 10% or more with a free TripyBooking Account.
        </p>
        <button className='headerBtn'>Sign in / Register</button>
        <div className="headerSearch">
        <div className="headerSearchItem">
        <RiHotelBedFill className='headerIcon' />
        <input type="text"  placeholder='Where are you going?' className='headerSearchInput' 
        onChange={e=>setDestination(e.target.value)}
        />
        </div>
        <div className="headerSearchItem" style={{color:'black'}}>
        <SlCalender className='headerIcon' />
        <span className='headerSearchText' onClick={()=>setOpenDate(!openDate)}>
  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${dates[0].endDate ? format(dates[0].endDate, "MM/dd/yyyy") : "Select a date"}`}
</span>

         {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className='date'
            minDate={new Date()}
          />}
        </div>
        <div className="headerSearchItem" style={{color:'black'}}>
        <FaPerson className='headerIcon' />
        <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>
           {`${options.adult} adult · ${options.children} children · ${options.room} room`}
        </span>
       {openOptions && <div className="options">
          <div className="optionItem">
            <span className="optionText">Adult</span>
            <div className="optionCounter">
            <button 
            disabled={options.adult <=0}
            className="optionCounterButton" onClick={()=>handleOption("adult" , "d")}>-</button>
            <span className="optionCounterNumber">{options.adult}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("adult" , "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">Children</span>
            <div className="optionCounter">
            <button
            disabled={options.children <=0}
            className="optionCounterButton" onClick={()=>handleOption("children" , "d")}>-</button>
            <span className="optionCounterNumber size">{options.children}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("children" , "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">Room</span>
            <div className="optionCounter">
            <button
            disabled={options.room <=0}
            className="optionCounterButton" onClick={()=>handleOption("room" , "d")}>-</button>
            <span className="optionCounterNumber">{options.room}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("room" , "i")}>+</button>
            </div>
          </div>
        </div>}
        </div>
        <div className="headerSearchItem" style={{color:'black'}}>
        <button className='headerBtn' onClick={handleSearch}>Search</button>
        </div>
        </div>
        </>}
       </div>
    </div>
  )
}

export default Header