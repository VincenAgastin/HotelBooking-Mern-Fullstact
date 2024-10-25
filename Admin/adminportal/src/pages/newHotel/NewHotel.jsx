import React, { useState } from 'react';
import '../newHotel/NewHotel.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; 
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(""); 

  const { data, loading } = useFetch("http://localhost:8800/api/rooms");

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setInfo((prev) => ({
      ...prev,
      [id]: value, 
    }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwdmhfiik/image/upload", data);
            return uploadRes.data.url; // Return the URL from the response
          } catch (uploadError) {
            console.error("Upload Error:", uploadError.response ? uploadError.response.data : uploadError.message);
            setError("An error occurred while uploading the image.");
            return null; // Return null if upload fails
          }
        })
      ).then(urls => urls.filter(url => url !== null)); // Filter out null responses

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:8800/api/hotels", newHotel, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("New hotel created:", response.data);
    } catch (err) {
      console.error("Error during hotel creation:", err.response ? err.response.data : err.message);
      setError("An error occurred while creating the hotel. Please check your input and try again.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id} 
                    onChange={handleChange} 
                    type={input.type} 
                    placeholder={input.placeholder} 
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading..." : data && data.map((room) => (
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel;
