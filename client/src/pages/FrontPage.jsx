import React from 'react'

// is there a way I can import images from a single directory instead of this
import africaVolunteerImg from "../assets/africa-volunteer.png"
import africanPeopleImg from "../assets/african-people.jpg"
import diversityImg from "../assets/diversity.jpg"
import indiaVolunteerImg from "../assets/india-volunteer.jpg"
import languageExchangeImg from "../assets/language-exchange.jpg"
import mrBeastWellsImg from "../assets/mr-beast-wells.jpeg"
import plantVolunteerImg from "../assets/plant-volunteer.jpg"
import morpheusImg from "../assets/morpheus.jpg"
import logoImg from "../assets/logo.jpg"

 
const FrontPage = () => {
    console.log("FrontPage")
 
    return(
        <div>
            {/* this account details link should replace login/sign up link at the 
            top right corner (nav bar?) if user signed in */}
            <a href="/account-details" rel="noopener noreferrer">Account Details Page (temporary)</a> <br></br>
            
            <img src={logoImg} alt="helping hands logo" width="200" height="200"></img>
            {/* FIXME: place helping hands title next to the logo */}
            <h1>Helping Hands</h1>
            
            <p><em>Nurturing a better future</em></p>

            
            <img src={diversityImg} alt="diverse group of people" width="512" height="341"></img>
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
                Our mission is simple: <strong>To leave the world a better place than we found it.</strong>
                <br></br>
                Helping Hands seeks to improve the lives of underpriveleged communities in
                health, education, and hapiness while fostering an ever-expanding community.  
                We strive to connect people like never before, and help everyone for a better future. 
                
            </p>
            <h1>Gallery</h1>
            {/* flexbox */}
            <img src={africaVolunteerImg} alt="volunteers in africa" width="480" height="250"></img>
            <img src={africanPeopleImg} alt="african people" width="466" height="311"></img>
            <img src={indiaVolunteerImg} alt="volunteers in india" width="474" height="291"></img>
            <img src={languageExchangeImg} alt="language exchange event" width="512" height="341"></img>
            <img src={mrBeastWellsImg} alt="mr beast posing with wells in africa" width="540" height="337"></img>
            <img src={plantVolunteerImg} alt="volunteering by planting plants" width="600" height="315"></img>


            <h1>Become One With Us.</h1>
            <img src={morpheusImg} alt="pill scene from the matrix film"></img>
            <p><a href="Login.jsx">Login</a> or <a href="SignUp.jsx">Create an Account</a></p>
        </div>
        

        
    )
}
 
export default FrontPage