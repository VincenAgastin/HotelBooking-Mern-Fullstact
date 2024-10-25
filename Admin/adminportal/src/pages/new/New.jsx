import React, { useState } from 'react';
import '../new/New.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; 
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setInfo((prev) => ({
      ...prev,
      [id]: value, 
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Check if file is selected
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwdmhfiik/image/upload", data);

      // Check if upload was successful
      if (uploadRes.status !== 200) {
        setError("Image upload failed. Please try again.");
        return;
      }

      const { url } = uploadRes.data;
      const newUser = {
        ...info,
        img: url
      };

      await axios.post("http://localhost:8800/api/auth/register", newUser);
    } catch (err) {
      console.log(err);
      setError("An error occurred while uploading the image.");
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    onChange={handleChange}  
                    type={input.type} 
                    placeholder={input.placeholder} 
                    id={input.id} // Added id prop here
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
              {error && <p className="error-message">{error}</p>} {/* Display error message */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
