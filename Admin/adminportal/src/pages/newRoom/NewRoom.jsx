import React, { useState } from 'react';
import '../newRoom/NewRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState("");

  const { data, loading } = useFetch("http://localhost:8800/api/hotels");

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setInfo((prev) => ({
      ...prev,
      [id]: value, 
    }));
  };

  const handleSelectHotel = (e) => {
    const selectedHotelId = e.target.value;
    console.log("Selected Hotel ID:", selectedHotelId); // Debugging line
    setHotelId(selectedHotelId);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Ensure hotelId is defined
    if (!hotelId) {
      console.error("Hotel ID is not set");
      return; // Prevent the request from being sent
    }

    // Split room numbers by comma and trim spaces
    const roomNumbers=rooms.split(",").map(room=>({number:room}))

    try {
      const token = localStorage.getItem("authToken");

      // Check if the token exists
      if (!token) {
        console.error("No token found");
        return; // Prevent the request from being sent
      }

      const response = await axios.post(
        `http://localhost:8800/api/rooms/${hotelId}`,
        { ...info, roomNumbers },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add Authorization header
          }
        }
      );

      console.log("Room added:", response.data);
    } catch (err) {
      console.error("Error adding room:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={handleChange} 
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea 
                  style={{ padding: "15px", lineHeight: "20px" }} 
                  onChange={e => setRooms(e.target.value)} 
                  placeholder='give comma between room numbers'
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={handleSelectHotel}>
                  {loading ? (
                    <option value="">Loading...</option>
                  ) : (
                    data && data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))
                  )}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
