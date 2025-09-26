import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

import "./Login.css"

const LogIn = () => {
    console.log("LogIn")
    const { login } = useAuth()
    const navigate = useNavigate()

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


    return(
        <div>
            <form className="form">
                <h2>Log in</h2>
                
                <label for="email">Email:</label>
                <input type="email" placeholder='person123@gmail.com' name="Email" required maxLength={40}/>
                
                <label for="password">Password:</label>
                <input type="password" placeholder='ABC123' name="Password" required minLength={12} maxLength={16}/>
                
                <Link to="/sign-up" className='link'>Don't have an account?</Link>
                
                <button onClick={handleVolunteerClick} type="submit">User Log In</button>
                <button onClick={handleAdminClick} type="submit">Admin Log In</button>
            </form>
        </div>
    )
}
 
export default LogIn