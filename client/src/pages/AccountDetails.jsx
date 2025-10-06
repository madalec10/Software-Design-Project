import React from 'react'
import './AccountDetails.css'

// FIXME: after css finished, end all classes with "AD"

const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            
            {/* PAGE TITLE */}
            <div className="title">
                <h1 className="pageName">Account Details</h1>
            </div>

            <ul className="parent">
                {/* PERSONAL INFORMATION */}
                <li className="child">
                    <div className="personal">
                        <h1 className="header">Personal Information</h1>
                        
                        <span className="field">Full Name:</span>
                        <span className="value">Walter Hartwell White Sr.</span>

                        <br></br>

                        <span className="field">Date of Birth:</span>
                        <span className="value">09 / 07 / 1958</span>

                        <br></br>

                        <span className="field">Gender:</span>
                        <span className="value">Male</span>
                    </div>
                </li>

                {/* CONTACT INFORMATION */}
                <li className="child">
                    <div className="contact">
                        <h1 className="header">Contact Information</h1>

                        {/* ADDRESS 1 */}
                        <div className="addressBox">
                            <h1 className="subHeader">Address 1</h1>

                            <span className="field">Address 1:</span>
                            <span className="value">308 Negra Arroyo Lane</span>

                            <br></br>

                            <span className="field">City:</span>
                            <span className="value">Albuquerque</span>

                            <br></br>

                            <span className="field">State:</span>
                            <span className="value">NM</span>

                            <br></br>

                            <span className="field">Zip Code:</span>
                            <span className="value">87111</span>
                        </div>

                        {/* ADDRESS 2 */}
                        <div className="addressBox">
                            <h1 className="subHeader">Address 2</h1>

                            <span className="field">Address 1:</span>
                            <span className="value">308 Negra Arroyo Lane</span>

                            <br></br>

                            <span className="field">City:</span>
                            <span className="value">Albuquerque</span>

                            <br></br>

                            <span className="field">State:</span>
                            <span className="value">NM</span>

                            <br></br>

                            <span className="field">Zip Code:</span>
                            <span className="value">87111</span>
                        </div>
                    </div>
                </li>

                {/* ATTRIBUTES */}
                <li className="child">
                    <div className="attributes">
                        <h1 className="header">Attributes</h1>

                        <span className="field">Skills:</span>
                        <span className="value">Teamwork, Communication</span>

                        <br></br>

                        <span className="field">Preferences:</span>
                        <span className="value">I like my sandwiches without the crust</span>

                        <br></br>

                        <span className="field">Availability:</span>
                        <span className="value">12 / 01 / 2025, 12 / 02 / 2025</span>
                    </div>
                </li>
            </ul>
            
            
            <div className="button">
                <button><a href="/edit-account">Edit Account</a></button>
            </div>


        </div>
    )
}
 
export default AccountDetails