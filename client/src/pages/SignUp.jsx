import React from 'react'
import { Link } from 'react-router-dom';
 
import "./SignUp.css"

const SignUp = () => {
    console.log("SignUp")
 
    return(
        <div>
            <form className="signup-form">
                <h2>Sign Up</h2>

                <label className="signup-label" for="email">Email:</label>
                <input className="signup-input" type="email" placeholder='person123@gmail.com' name="Email" required maxLength={40}/>

                <label className="signup-label" for="password">Password:</label>
                <input className="signup-input" type="password" placeholder='ABC123' name="Password" required minLength={12} maxLength={16}/>

                <label className="signup-label" for="confirm password">Confirm Password:</label>
                <input className="signup-input" type="password" placeholder='ABC123' name="Confirm Password" required minLength={12} maxLength={16}/>

                <Link to="/log-in" className='link'>Already have an account?</Link>

                <button className="signup-button" type="submit">Sign Up</button>

            </form>
        </div>
    )
}
 
export default SignUp