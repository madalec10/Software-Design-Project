import React from 'react'
import './AccountDetails.css'


const AccountDetails = () => {
    console.log("AccountDetails")
 
    return(
        <div>
            
            
            {/* PAGE TITLE */}
            <div className="parentTitleAD">
                <div className="titleAD">
                    <h1 className="pageNameAD">Account Details</h1>
                </div>
            </div>

            <ul className="parentAD">
                {/* PERSONAL INFORMATION */}
                <li className="childAD">
                    <div className="personalAD">
                        <h1 className="headerAD">Personal Information</h1>
                        
                        <div className="textLineAD">
                            <span className="fieldAD">Full Name: </span>
                            <span className="valueAD">Walter Hartwell White Sr.</span>
                        </div>

                        

                        <div className="textLineAD">
                            <span className="fieldAD">Date of Birth: </span>
                            <span className="valueAD">09 / 07 / 1958</span>
                        </div>

                        

                        <div className="textLineAD">
                            <span className="fieldAD">Gender: </span>
                            <span className="valueAD">Male</span>
                        </div>
                    </div>
                </li>

                {/* CONTACT INFORMATION */}
                <li className="childAD">
                    <div className="contactAD">
                        <h1 className="headerAD">Contact Information</h1>

                        {/* ADDRESS 1 */}
                        <div className="addressBoxAD">
                            <h1 className="subHeaderAD">Address 1</h1>

                            <div className="textLineAD">
                                <span className="fieldAD">Address 1: </span>
                                <span className="valueAD">308 Negra Arroyo Lane</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">City: </span>
                                <span className="valueAD">Albuquerque</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">State: </span>
                                <span className="valueAD">NM</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">Zip Code: </span>
                                <span className="valueAD">87111</span>
                            </div>
                        </div>

                        {/* ADDRESS 2 */}
                        <div className="addressBoxAD">
                            <h1 className="subHeaderAD">Address 2</h1>

                            <div className="textLineAD">
                                <span className="fieldAD">Address 2: </span>
                                <span className="valueAD">308 Negra Arroyo Lane</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">City: </span>
                                <span className="valueAD">Albuquerque</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">State: </span>
                                <span className="valueAD">NM</span>
                            </div>

                            

                            <div className="textLineAD">
                                <span className="fieldAD">Zip Code: </span>
                                <span className="valueAD">87111</span>
                            </div>
                        </div>
                    </div>
                </li>

                {/* ATTRIBUTES */}
                <li className="childAD">
                    <div className="attributesAD">
                        <h1 className="headerAD">Attributes</h1>

                        <div className="textLineAD">
                            <span className="fieldAD">Skills: </span>
                            <span className="valueAD">Teamwork, Communication</span>
                        </div>

                        

                        <div className="textLineAD">
                            <span className="fieldAD">Preferences: </span>
                            <span className="valueAD">No crust on sandwiches</span>
                        </div>

                        

                        <div className="textLineAD">
                            <span className="fieldAD">Availability: </span>
                            <span className="valueAD">12 / 01 / 2025, 12 / 02 / 2025</span>
                        </div>
                    </div>
                </li>
            </ul>
            
            
            <div className="buttonAD">
                <button><a href="/edit-account">Edit Account</a></button>
            </div>


        </div>
    )
}
 
export default AccountDetails