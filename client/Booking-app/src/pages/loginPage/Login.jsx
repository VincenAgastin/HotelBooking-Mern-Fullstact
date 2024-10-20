import React, { useContext, useState } from 'react'
import '../loginPage/Login.css'
import { AuthContext } from '../../components/context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


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
          console.log('Login response:', res.data); // Check the response
    
          // Store user  in localStorage
          localStorage.setItem('user', JSON.stringify(res.data));
          
    
          dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
          navigate('/');
        } catch (err) {
          console.log('Login error:', err.response?.data); // Log the error for clarity
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: err.response?.data?.message || 'Login failed',
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
