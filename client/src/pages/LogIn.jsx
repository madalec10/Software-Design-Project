import React from 'react'
import { Link } from 'react-router-dom';

import "./../Login.css"

const LogIn = () => {
    console.log("LogIn")
 
    return(
        <div>
            <form className="form">
                <h2>Log in</h2>
                
                <label for="email">Email:</label>
                <input type="email" placeholder='person123@gmail.com' name="Email" required maxLength={40}/>
                
                <label for="password">Password:</label>
                <input type="password" placeholder='ABC123' name="Password" required minLength={12} maxLength={16}/>
                
                <Link to="/sign-up" className='link'>Don't have an account?</Link>
                
                <button type="submit">User Log In</button>
                <button type="submit">Admin Log In</button>
            </form>
        </div>
    )
}
 
export default LogIn