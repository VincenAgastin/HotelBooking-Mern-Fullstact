import React, { useContext, useState } from 'react';
import '../reserve/Reserve.css';
import { MdCancel } from "react-icons/md";
import useFetch from '../../hooks/useFetch';
import {SearchContext} from '../context/SearchContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId, selectedDates }) => {
    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
    const [dateError, setDateError] = useState(false);
    const [selectedRooms,setSelectedRooms]=useState([])
    const {dates}=useContext(SearchContext)

    const getDatesInRange=(startDate,endDate)=>{
        const start=new Date(startDate)
        const end=new Date(endDate)
        const date=new Date(start.getTime());
        const list =[]

        while(date <= end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list
    }

    const alldates=getDatesInRange(dates[0].startDate,dates[0].endDate)

    const isAvailable=(roomNumber)=>{
        const isFound=roomNumber.unavailableDates.some(date=>alldates.includes(new Date(date).getTime()));

        return !isFound
    }
   
      // Handle the selection of room checkboxes
      const handleSelect = (e) => {
        const checked = e.target.checked;
        const value =e.target.value

        setSelectedRooms(checked ? [...selectedRooms,value] : selectedRooms.filter((item)=>item!==value)
        );
    };
    console.log(selectedRooms);

    const navigate=useNavigate()

    const handleReserve = async() => {
        try{
            await Promise.all(selectedRooms.map((roomId)=>{
                const res=axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`,{dates:alldates});
                return res.data
            }))
            setOpen(false)
            navigate("/")
        }catch(err){
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className='reserve'>
            <div className="rContainer">
                <MdCancel className='rClose' onClick={() => setOpen(false)} />
                <span>Select Your Rooms :</span>
                {/* Check if data exists and has rooms */}
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">

                                {item.roomNumbers.map(roomNumber=>(
                                    <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input  type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                   </div>
                                ))}
                             </div>
                        </div>
                    ))
                ) : (
                    <div>No rooms available</div>
                )}

                {/* Handle no date error */}
                {dateError && <span className="error">No dates selected. Please select your dates.</span>}

                <button onClick={handleReserve} className="rButton">Reserve Now !</button>
            </div>
        </div>
    );
};

export default Reserve;
