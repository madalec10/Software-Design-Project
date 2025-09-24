import React from 'react'
 
const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            <h1>Account Details</h1>

            <h3>Personal Information</h3>
            
            <p><strong>Full Name: </strong></p>
            <p><strong>Date of Birth: </strong></p>
            <p><strong>Gender: </strong></p>
            <p><strong>Preferences: </strong></p>


            <h3>Place of Residence</h3>
            
            <h4>Address 1</h4>
            <p><strong>City: </strong></p>
            <p><strong>State: </strong></p>
            <p><strong>Zip Code: </strong></p>
            
            <h4>Address 2</h4>
            <p><strong>City: </strong></p>
            <p><strong>State: </strong></p>
            <p><strong>Zip Code: </strong></p>

            <h4>Other</h4>
            <p><strong>Skills: </strong></p>
            <p><strong>Preferences: </strong></p>
            <p><strong>Availability: </strong></p>

        </div>
    )
}
 
export default AccountDetails