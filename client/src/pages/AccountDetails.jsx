import React from 'react'
import style from '../AccountDetails.module.css'
 
const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            <h1 class = {style.header}>Account Details</h1>

            <h3>Personal Information</h3>
            
            <span class = {style.field}><strong>Full Name: </strong></span>
            <span class = {style.value}>Walter Hartwell White Sr.</span>
            <br></br>

            <span class = {style.field}><strong>Date of Birth: </strong></span>
            <span class = {style.value}>September 7, 1958</span>
            <br></br>

            <span class = {style.field}><strong>Gender: </strong></span>
            <span class = {style.value}>Male</span>
            <br></br>
            

            <h3 class = {style.header}>Place of Residence</h3>
            
            <span class = {style.field}><strong>Address 1: </strong>308 Negra Arroyo Lane</span>
            <span class = {style.field}><strong>City: </strong>Albuquerque</span>
            <span class = {style.field}><strong>State: </strong>New Mexico</span>
            <span class = {style.field}><strong>Zip Code: </strong>87111</span>
            
            <span class = {style.field}><strong>Address 2: </strong>NA</span>
            <span class = {style.field}><strong>City: </strong>NA</span>
            <span class = {style.field}><strong>State: </strong>NA</span>
            <span class = {style.field}><strong>Zip Code: </strong>NA</span>

            <h3 class = {style.header}>Other Information</h3>
            <span class = {style.field}><strong>Skills: </strong>Chemistry, Baking, Car Washes</span>
            <span class = {style.field}><strong>Preferences: </strong>The color blue</span> {/* idk what preferences mean exactly */}
            <span class = {style.field}><strong>Availability: </strong>M, W, F</span>

        </div>
    )
}
 
export default AccountDetails