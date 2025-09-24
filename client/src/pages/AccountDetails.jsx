import React from 'react'
 
const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            <h1>Account Details</h1>

            <h3>Personal Information</h3>
            
            <p><strong>Full Name: </strong>Walter Hartwell White Sr.</p>
            <p><strong>Date of Birth: </strong>September 7, 1958</p>
            <p><strong>Gender: </strong>Male</p>
            

            <h3>Place of Residence</h3>
            
            <p><strong>Address 1: </strong>308 Negra Arroyo Lane</p>
            <p><strong>City: </strong>Albuquerque</p>
            <p><strong>State: </strong>New Mexico</p>
            <p><strong>Zip Code: </strong>87111</p>
            
            <p><strong>Address 2: </strong>NA</p>
            <p><strong>City: </strong>NA</p>
            <p><strong>State: </strong>NA</p>
            <p><strong>Zip Code: </strong>NA</p>

            <h4>Other</h4>
            <p><strong>Skills: </strong>Chemistry, Baking, Car Washes</p>
            <p><strong>Preferences: </strong>The color blue</p> {/* idk what preferences mean exactly */}
            <p><strong>Availability: </strong>M, W, F</p>

        </div>
    )
}
 
export default AccountDetails