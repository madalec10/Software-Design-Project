import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
 
import "./SignUp.css"

const SignUp = () => {
    console.log("SignUp")
    const { login } = useAuth()
    const navigate = useNavigate()
    const [userData, setUser] = useState({ 
        email:"",
        password:"",
        password2:""
    })

    

    const handleChange = (e) =>{ // given target to given value
        setUser(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        login(null, null);
        localStorage.removeItem("user");
        if(userData.password !== userData.password2){
            window.alert("Passwords don't match")
            return;
        }

        try{
            const res = await axios.post('http://localhost:8800/sign-up', userData, {
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials: true,
            }); 
            const { role } = res.data
            
            console.log(res.data)
            login(userData.email, role)
            navigate('/')
        }
        catch(err){
            login(null, null);
            localStorage.removeItem("user");
            window.alert(err.response.data.error);
        }
    
    
    }
 
    return(
        <div>
            <form className="form">
                <h2>Sign Up</h2>
                
                <label for="email">Email:</label>
                <input type="email" onChange={handleChange} placeholder='person123@gmail.com' name="email" required maxLength={40}/>
                
                <label for="password">Password:</label>
                <input type="password" onChange={handleChange} placeholder='ABC123' name="password" required minLength={12} maxLength={16}/>
                
                <label for="confirm password">Confirm Password:</label>
                <input type="password" onChange={handleChange} placeholder='ABC123' name="password2" required minLength={12} maxLength={16}/>

                <Link to="/log-in" className='link'>Already have an account?</Link>
                
                <button onClick={handleClick} type="submit">Sign Up</button>
                
            </form>
        </div>
    )
}
 
export default SignUp