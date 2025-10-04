import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' //api calls

import "./Login.css"

const LogIn = () => {
    console.log("LogIn")
    const { login } = useAuth()
    const navigate = useNavigate()

    const [userData, setLogin] = useState({ //login json inialized to be empty
        email:"",
        password:"",
    })

    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) =>{ // given target to given value
        setLogin(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleAdminClick = async (e) => {
        e.preventDefault()  //prevents page refresh on button click
        login("Admin")
        navigate('/')
    }
    const handleVolunteerClick = async (e) => {
        e.preventDefault()  //prevents page refresh on button click
        login("Volunteer")
        navigate('/')
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:8800/log-in', userData, {
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials: true,
            }); 
            const { role } = res.data
            
                
            login(userData.email, role)
            navigate('/')
        }
        catch(err){
            window.alert(err.response.data.error);
        }
    
    
    }


    return(
        <div>
            <form className="form">
                <h2>Log in</h2>
                
                <label for="email">Email:</label>
                <input type="email" onChange={handleChange} placeholder='person123@gmail.com' name="email" required maxLength={40}/>
                
                <label for="password">Password:</label>
                <input type="password" onChange={handleChange} placeholder='ABC123' name="password" required minLength={12} maxLength={16}/>
                
                <Link to="/sign-up" className='link'>Don't have an account?</Link>
                
                <button onClick={handleClick} type="submit">Log In</button>
            </form>
        </div>
    )
}
 
export default LogIn