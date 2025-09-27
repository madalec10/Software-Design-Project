import React from 'react'
import style from './AccountDetails.module.css'
import CreatableSelect from 'react-select/creatable'
import {useState} from "react";
 
const AccountDetails = () => {
    console.log("AccountDetails")
 
    const [fullName, setFullName] = useState("");
    
    return(
        <div>
            
            <h1 class = {style.pageName}>Account Details</h1>




            {/* personal info section */}
                    <h3 class = {style.header}>Personal Information</h3>
                
                    <span class = {style.field}><strong>Full Name: </strong></span>
                    <input
                        class = {style.value}
                        type = "text"
                        value = {fullName}
                        onChange = {(e) => setFullName(e.target.value)}
                        placeholder = "Walter Hartwell White Sr."
                        maxLength = {50}
                    />
                    <span style={{ color: 'red' }}><em>  limit 50 characters, required</em></span>
                    <br></br>

                    <span class = {style.field}><strong>Date of Birth: </strong></span>
                    <input
                        class = {style.value}
                        type = "text"
                        placeholder = "September 7, 1958"
                        maxLength = {50}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 50 characters, optional</em></span>
                    <br></br>

                    <span class = {style.field}><strong>Gender: </strong></span>
                    <input
                        class = {style.value}
                        type = "text"
                        placeholder = "Male"
                        maxLength = {50}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 50 characters, optional</em></span>
                    <br></br>

            
            
            
            

            <h3 class = {style.header}>Place of Residence</h3>
            
            {/* maybe make address 1 and 2 fields unique headers */}
            
            <span class = {style.field}><strong>Address 1: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder = "308 Negra Arroyo Lane"
                maxLength = {100}
            />
            <span style={{ color: 'red' }}><em>  limit 100 characters, required</em></span>
            <br></br>

            <span class = {style.field}><strong>City: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder = "Albuquerque"
                maxLength = {100}
            />
            <span style={{ color: 'red' }}><em>  limit 100 characters, required</em></span>
            <br></br>


            <span class = {style.field}><strong>State: </strong></span>
            <select class = {style.value} name = "state" required>
                <option value = "select-state" required>Select State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
            </select>
            <span style={{ color: 'red' }}><em>  required</em></span>
            <br></br>
            
            
            <span class = {style.field}><strong>Zip Code: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder="87111"
                maxLength = {9}
            />
            <span style={{ color: 'red' }}><em>  must be 5-9 characters, required</em></span>
            <br></br>

            

            
            <br></br>
            <span class = {style.field}><strong>Address 2: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder = "308 Negra Arroyo Lane"
                maxLength = {100}
            />
            <span style={{ color: 'gray' }}><em>  limit 100 characters, optional</em></span>
            <br></br>

            <span class = {style.field}><strong>City: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder = "Albuquerque"
                maxLength = {100}
            />
            <span style={{ color: 'gray' }}><em>  limit 100 characters, optional</em></span>
            <br></br>


            <span class = {style.field}><strong>State: </strong></span>
            <select class = {style.value} name = "state" required>
                <option value = "select-state" required>Select State</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
            </select>
            <span style={{ color: 'gray' }}><em>  optional</em></span>
            <br></br>
            
            
            <span class = {style.field}><strong>Zip Code: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder="87111"
                maxLength = {9}
            />
            <span style={{ color: 'gray' }}><em>  must be 5-9 characters, optional</em></span>
            <br></br>





            <h3 class = {style.header}>Other Information</h3>
            
            {/* Skills */}
            <span class = {style.field}><strong>Skills: </strong></span>
            <select class = {style.value} name = "skill" required multiple>
                <option value = "select-skill" >Select Skill</option>
                <option value = "communicate" >Good Communicator</option>
                <option value = "strong" >Strong</option>
                <option value = "creative" >Creativity</option>
                <option value = "sales" >Sales</option>
                <option value = "problem-solver" >Problem Solver</option>
            </select>
            <span style={{ color: 'red' }}><em>  required</em></span>
            <br></br>


            {/* <span class = {style.value}>Chemistry, Baking, Car Washes</span>
            <br></br> */}
            


            {/* Preferences */}
            <span class = {style.field}><strong>Preferences: </strong></span>
            <input
                class = {style.value}
                type = "text"
                placeholder = "The color blue"
                maxLength = {500}
            />
            <span style={{ color: 'gray' }}><em>  limit 500 characters, optional</em></span>
            <br></br>

            
            
            <span class = {style.field}><strong>Availability: </strong></span>
            <select class = {style.value} name = "available" required multiple>
                <option value = "Monday">Monday</option>
                <option value = "Tuesday">Tuesday</option>
                <option value = "Wednesday">Wednesday</option>
                <option value = "Thursday">Thursday</option>
                <option value = "Friday">Friday</option>
                <option value = "Saturday">Saturday</option>
                <option value = "Sunday">Sunday</option>

            </select>
            <span style={{ color: 'red' }}><em>  required</em></span>
            <br></br>

        </div>
    )
}
 
export default AccountDetails