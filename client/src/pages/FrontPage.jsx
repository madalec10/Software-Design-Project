import React from 'react';
import './FrontPage.css';

import africaVolunteerImg from "../assets/africa-volunteer.png";
import africanPeopleImg from "../assets/african-people.jpg";
import diversityImg from "../assets/diversity.jpg";
import indiaVolunteerImg from "../assets/india-volunteer.jpg";
import languageExchangeImg from "../assets/language-exchange.jpg";
import diverseFriendsImg from "../assets/diverse-friends.jpg";
import logoImg from "../assets/logo.jpg";

const FrontPage = () => {
    console.log("FrontPage")
 
    return(
        <div>
            {/* removed classes from all images */}
            <img src={logoImg} alt="helping hands logo"></img>
            <h1 className="logoText">Helping Hands</h1>
            
            <p className="motto">Nurturing a better future</p>

            
            <img src={diversityImg} alt="diverse group of people"></img>
            

            <h1 className="header">About Us</h1>

            <p className="body">
                At Helping Hands, we believe in the value of helping others. Since 1970, we have
                helped over 4 people across 30 states and counting. Today, we've grown into a vast
                network of like minded people that are eager to lend a helping hand to those in
                need. Through our online platform, we can easily connect volunteers to events that 
                match their skills and interests like never before -- so don't be a stranger and lend a helping hand today!
            </p>


            <h1 className="header">Mission Statement</h1>
            
            <p className="mission">Our mission is simple: To leave the world a better place than we found it.</p>
            <p className="body">
                Helping Hands seeks to improve the lives of underpriveleged communities in
                health, education, and hapiness while fostering an ever-expanding community.  
                We strive to connect people like never before, and help everyone for a better future. 
            </p>

            
            <h1 className="header">Gallery</h1>


            {/* could row1 and row2 be just one class */}
            <div className="row1">
                <img src={africaVolunteerImg} alt="volunteers in africa"></img>
                <img src={africanPeopleImg} alt="african people"></img>
            </div>

            <div className="row2">
                <img src={indiaVolunteerImg} alt="volunteers in india"></img>
                <img src={languageExchangeImg} alt="language exchange event"></img>
            </div>
            


            <h1 className="askJoin">Lend a Helping Hand Today!</h1>

            <img src={diverseFriendsImg} alt="diverse group of friends"></img>
            
            <p className="enterAccount"><a href="/log-in">Login</a> or <a href="/sign-up">Create an Account</a>!</p>
        </div>
        

        
    )
}
 
export default FrontPage