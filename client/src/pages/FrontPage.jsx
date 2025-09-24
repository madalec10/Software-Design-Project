import React from 'react'
import style from '../FrontPage.module.css'

// is there a way I can import images from a single directory instead of this
import africaVolunteerImg from "../assets/africa-volunteer.png"
import africanPeopleImg from "../assets/african-people.jpg"
import diversityImg from "../assets/diversity.jpg"
import indiaVolunteerImg from "../assets/india-volunteer.jpg"
import languageExchangeImg from "../assets/language-exchange.jpg"
import diverseFriendsImg from "../assets/diverse-friends.jpg"
import plantVolunteerImg from "../assets/plant-volunteer.jpg"
import logoImg from "../assets/logo.jpg"

 
const FrontPage = () => {
    console.log("FrontPage")
 
    return(
        <div>
            {/* this account details link should replace login/sign up link at the 
            top right corner (nav bar?) if user signed in */}
            <a href="/account-details" rel="noopener noreferrer">Account Details Page (temporary)</a> <br></br>
            
            <img src={logoImg} id = "logoImg" alt="helping hands logo" width="200" height="200"></img>
            {/* FIXME: place helping hands title next to the logo */}
            <h1 id = "logoText">Helping Hands</h1>
            
            <p id = "motto"><em>Nurturing a better future</em></p>

            
            <img src={diversityImg} class = {style.bigImg} alt="diverse group of people" width="512" height="341"></img>
            <br></br>
            <h1>About Us</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Impedit maxime modi et harum, sint repellat repellendus laudantium 
                laboriosam eaque accusantium beatae, minus laborum, qui molestiae. 
                Necessitatibus perspiciatis ullam modi vitae.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Impedit maxime modi et harum, sint repellat repellendus laudantium 
                laboriosam eaque accusantium beatae, minus laborum, qui molestiae. 
                Necessitatibus perspiciatis ullam modi vitae.
            </p>
            {/* <br></br> */}
            <h1>Mission Statement</h1>
            <p>
                <p id = "mission">Our mission is simple: <strong>To leave the world a better place than we found it.</strong></p>
                <br></br>
                Helping Hands seeks to improve the lives of underpriveleged communities in
                health, education, and hapiness while fostering an ever-expanding community.  
                We strive to connect people like never before, and help everyone for a better future. 
                
            </p>
            <h1>Gallery</h1>
            {/* flexbox */}
            <img src={africaVolunteerImg} class = {style.gallery} alt="volunteers in africa" width="480" height="250"></img>
            <img src={africanPeopleImg} class = {style.gallery} alt="african people" width="466" height="311"></img>
            <img src={indiaVolunteerImg} class = {style.gallery} alt="volunteers in india" width="474" height="291"></img>
            <img src={languageExchangeImg} class = {style.gallery} alt="language exchange event" width="512" height="341"></img>
            <img src={plantVolunteerImg} class = {style.gallery} alt="volunteering by planting plants" width="600" height="315"></img>


            <h1>Lend a Helping Hand Today!</h1>

            <img src={diverseFriendsImg} class = {style.bigImg} alt="diverse group of friends" with="915" height="400"></img>
            <p id = "signInPrompt"><a href="Login.jsx">Login</a> or <a href="SignUp.jsx">Create an Account</a></p>
        </div>
        

        
    )
}
 
export default FrontPage