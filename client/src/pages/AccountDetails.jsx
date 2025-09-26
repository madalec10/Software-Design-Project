import React from 'react'
import style from './AccountDetails.module.css'
 
const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            <h1 class = {style.pageName}>Account Details</h1>

            <h3 class = {style.header}>Personal Information</h3>
            
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
            
            {/* maybe make address 1 and 2 fields unique headers */}
            <span class = {style.field}><strong>Address 1: </strong></span>
            <span class = {style.value}>308 Negra Arroyo Lane</span>
            <br></br>

            <span class = {style.field}><strong>City: </strong></span>
            <span class = {style.value}>Albuquerque</span>
            <br></br>

            <span class = {style.field}><strong>State: </strong></span>
            <span class = {style.value}>New Mexico</span>
            <br></br>

            <span class = {style.field}><strong>Zip Code: </strong></span>
            <span class = {style.value}>87111</span>
            <br></br>

            
            <br></br>
            <span class = {style.field}><strong>Address 2: </strong></span>
            <span class = {style.value}>NA</span>
            <br></br>

            <span class = {style.field}><strong>City: </strong></span>
            <span class = {style.value}>NA</span>
            <br></br>

            <span class = {style.field}><strong>State: </strong></span>
            <span class = {style.value}>NA</span>
            <br></br>

            <span class = {style.field}><strong>Zip Code: </strong></span>
            <span class = {style.value}>NA</span>
            <br></br>





            <h3 class = {style.header}>Other Information</h3>
            
            <span class = {style.field}><strong>Skills: </strong></span>
            <span class = {style.value}>Chemistry, Baking, Car Washes</span>
            <br></br>

            <span class = {style.field}><strong>Preferences: </strong></span> {/* idk what preferences mean exactly */}
            <span class = {style.value}>The color blue</span>
            <br></br>
            
            {/* FIXME: change this to calendar selection thingy */}
            <span class = {style.field}><strong>Availability: </strong>M, W, F</span>

        </div>
    )
}
 
export default AccountDetails