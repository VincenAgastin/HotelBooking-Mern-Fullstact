import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../../pages/login/Login.scss'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const navigate=useNavigate()

    const {  loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

   

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
          const res = await axios.post('http://localhost:8800/api/auth/login', credentials);
      
          // Log the entire response to inspect the structure
          // console.log('Login response:', res.data);
          // console.log('token response:', res.data.token);
      
          // Ensure the token is stored correctly
          if (res.data.token) {
            localStorage.setItem('authToken', res.data.token);
          } else {
            console.error("No token in response");
          }
      
          if (res.data.isAdmin) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
            navigate("/");
          } else {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: { message: "You are not allowed!" }
            });
          }
        } catch (err) {
          console.error("Login error:", err.response || err.message);
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: err.response?.data?.message || "Login failed" }
          });
        }
      };
      
    


    return (
        <div className='login'>
            <div className="lContainer">
                <h1 style={{color:"#9d4edd",letterSpacing:"3px",fontSize:"40px",  fontFamily: "Bebas Neue, sans-serif"
}}>TripyBooking</h1>
                <input
                    type="text"
                    placeholder='Username'
                    id='username'
                    onChange={handleChange}
                    className='lInput'
                />
                <input
                    type="password"
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                    className='lInput'
                />
                <button disabled={loading}
                    onClick={handleClick}
                    className="lButton"
                
                >
                    Login
                </button>
                {/* Display error message */}
                {error && <span className="error">{error}</span>}
            </div>
        </div>
    );
};

export default Login;
