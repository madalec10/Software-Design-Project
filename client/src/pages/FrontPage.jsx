import React from 'react'
import style from './FrontPage.module.css'

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
            {/* FIXME: this link is temporary. should replace the login/signup links at the nav bar when user already signed in */}
            <a href="/account-details" rel="noopener noreferrer" class = {style.accountLink}>Account Details</a> <br></br>
            
            <img src={logoImg} class = {style.logoImg} alt="helping hands logo" width="200" height="200"></img>
            {/* FIXME: place helping hands title next to the logo */}
            <h1 class = {style.logoText}>Helping Hands</h1>
            
            <p class = {style.motto}><em>Nurturing a better future</em></p>

            
            <img src={diversityImg} class = {style.bigImg} alt="diverse group of people" width="512" height="341"></img>
            <br></br>
            <h1 class = {style.header}>About Us</h1>
            <p class = {style.body}>
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
            <h1 class = {style.header}>Mission Statement</h1>
            <p class = {style.body}>
                <p class = {style.mission}>Our mission is simple: <strong>To leave the world a better place than we found it.</strong></p>
                <br></br>
                Helping Hands seeks to improve the lives of underpriveleged communities in
                health, education, and hapiness while fostering an ever-expanding community.  
                We strive to connect people like never before, and help everyone for a better future. 
                
            </p>
            <h1 class = {style.header}>Gallery</h1>
            {/* flexbox */}

            <div class = {style.row1}>
                <img src={africaVolunteerImg} class = {style.galleryImg} alt="volunteers in africa" width="480" height="250"></img>
                <img src={africanPeopleImg} class = {style.galleryImg} alt="african people" width="466" height="311"></img>
            </div>

            <div class = {style.row2}>
                <img src={indiaVolunteerImg} class = {style.galleryImg} alt="volunteers in india" width="474" height="291"></img>
                <img src={languageExchangeImg} class = {style.galleryImg} alt="language exchange event" width="512" height="341"></img>
            </div>
            
            {/* <br></br> */}
            
            {/* <br></br> */}
            {/* <img src={plantVolunteerImg} class = {style.galleryImg} alt="volunteering by planting plants" width="600" height="315"></img> */}


            <h1 class = {style.askJoin}>Lend a Helping Hand Today!</h1>

            <img src={diverseFriendsImg} class = {style.bigImg} alt="diverse group of friends" with="915" height="400"></img>
            <p class = {style.enterAccount}><a href="/log-in">Login</a> or <a href="/sign-up">Create an Account</a>!</p>
        </div>
        

        
    )
}
 
export default FrontPage