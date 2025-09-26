import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
 
import "./SignUp.css"

const SignUp = () => {
    console.log("SignUp")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()  //prevents page refresh on button click
        login("Volunteer")
        navigate('/')
    }
 
    return(
        <div>
            <form className="form">
                <h2>Sign Up</h2>
                
                <label for="email">Email:</label>
                <input type="email" placeholder='person123@gmail.com' name="Email" required maxLength={40}/>
                
                <label for="password">Password:</label>
                <input type="password" placeholder='ABC123' name="Password" required minLength={12} maxLength={16}/>
                
                <label for="confirm password">Confirm Password:</label>
                <input type="password" placeholder='ABC123' name="Confirm Password" required minLength={12} maxLength={16}/>

                <Link to="/log-in" className='link'>Already have an account?</Link>
                
                <button onClick={handleClick} type="submit">Sign Up</button>
                
            </form>
        </div>
    )
}
 
export default SignUp