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

 
const FrontPage = () => {
    console.log("FrontPage")
 
    return(
        <div>
            <a href="AccountDetails.jsx">Account Details Page (temporary)</a>
            
            
            <h1>Helping Hands</h1>
            <p><em>Lend a hand for a better future</em></p>
            <img src={diversityImg} alt="diverse group of people"></img>
            <br></br>
            <h1>About Us</h1>
            <p>
                For 400 years, Helping Hands has been in the non-profit business of saving perople around the globe. 
                Whether it's building homes in Africa or escorting gambling addicts into rehab, we are 
                always here to help. With over 500 centers across 17 continents and 90 galaxies, we're ready to 
                lend a helping hand to anyone in need. <strong>Volunteering isn't just something we do -- it's something we live by.</strong> Volunteering runs in our veins. 
                I eat volunteering for breakfast. When the waiter asks me for more cheese on my pasta at 
                Olive Garden, I say, "No thank you, I'd rather you top it off with some shredded volunteering with
                a side of canned volunteering and volunteering ice cream for desert". That's why when it comes to volunteering, 
                we don't play around.
            </p>
            {/* <br></br> */}
            <h1>Mission Statement</h1>
            <p>
                Helping Hands seeks to improve the lives of underpriveleged communities through nurturing
                health, education, and hapiness by fostering a community of volunteers with like-minded individuals.  
                We strive to connect people like never before, and help everyone for a better future. 
                
            </p>
            <h1>Gallery</h1>
            {/* flexbox */}
            <img src={africaVolunteerImg} alt="volunteers in africa"></img>
            <img src={africanPeopleImg} alt="african people"></img>
            <img src={indiaVolunteerImg} alt="volunteers in india"></img>
            <img src={languageExchangeImg} alt="language exchange event"></img>
            <img src={mrBeastWellsImg} alt="mr beast posing with wells in africa"></img>
            <img src={plantVolunteerImg} alt="volunteering by planting plants"></img>


            <h1>Become One With Us.</h1>
            <img src={morpheusImg} alt="pill scene from the matrix film"></img>
            <p><a href="Login.jsx">Login</a> or <a href="SignUp.jsx">Create an Account</a></p>
        </div>
        

        
    )
}
 
export default FrontPage