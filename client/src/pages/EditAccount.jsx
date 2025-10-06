import React from 'react';
import './EditAccount.css';

import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-multi-date-picker';
import { useState } from 'react';
 
// step 1: name all classes normally 
// step 2: end all clases with "EA"
const initialOptions = [
    { value: "Organizing", label: "Organizing" },
    { value: "Power Tools", label: "Power Tools" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Communication", label: "Communication" },
    { value: "Time Management", label: "Time Management" }
];

const EditAccount = () => {
    console.log("EditAccount")
 
    // delete later
    const [fullName, setFullName] = useState("");

    // FIXME: modify this code after it works
    const [dateOfBirth, setDateOfBirth] = useState("");//date of birth
    const[selectedDates, setSelectedDates] = useState([]);//for availability

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Dates:", selectedDates);
    };

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(initialOptions);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions(prev => [...prev, newOption]);
        setSelectedOptions(prev => [...(prev || []), newOption]);
    };
    
    
    return(
        <div>
            

            {/* PAGE TITLE */}
            <div className="parent">
                <h1 className="pageName">Edit Account</h1>
                <p className="required">* required</p>
            </div>

            <form>

                {/* PERSONAL INFORMATION */}
                <div className="parent">
                    <div className="personal">
                        <h1 className="header">Personal Information</h1>
                        
                        <label for="fullName" className="label">Full Name:</label>
                        <input name="fullName" className="input" placeholder="Walter Hartwell White Sr." maxLength={50} required/>
                        <span style={{ color: "red" }}>*</span>

                        <br></br>
                        
                        <label htmlFor="birth" className="label">Date of Birth:</label>
                        <input id="birth" name="birth" className="input" type="date" value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}/> 

                        <br></br>

                        <label for="gender" className="label">Gender:</label>
                        <select name="gender" className="select">
                            <option value="" disabled selected>Select Gender</option>
                            <option value="male">Male</option> {/*display default?*/}
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* CONTACT INFORMATION */}
                <div className="parent">
                    <div className="contact">
                        <h1 className="header">Contact Information</h1>

                        {/* ADDRESS 1 */}
                        <div className="addressBox">
                            <h1 className="subheader">Address 1*</h1>

                            <label for="address1" className="label">Address 1:</label>
                            <input name="address1" className="input" placeholder="308 Negra Arroyo Lane" maxLength={100} required/>
                            <span style={{ color: "red" }}>*</span>

                            <br></br>

                            <label for="city1" className="label">City:</label>
                            <input name="city1" className="input" placeholder="Albuquerque" maxlength={100} required/>
                            <span style={{ color: "red" }}>*</span>

                            <br></br>

                            <label for="state1" className="label">State:</label>{/*display default? */}
                            <select name="state1" className="select" required>
                                <option value="" disabled selected>Select State</option>
                                <option value="AK">AK</option>
                                <option value="AL">AL</option>
                                <option value="AR">AR</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="IA">IA</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="MA">MA</option>
                                <option value="MD">MD</option>
                                <option value="ME">ME</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MO">MO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="NE">NE</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NV">NV</option>
                                <option value="NY">NY</option>
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
                                <option value="VA">VA</option>
                                <option value="VT">VT</option>
                                <option value="WA">WA</option>
                                <option value="WI">WI</option>
                                <option value="WV">WV</option>
                                <option value="WY">WY</option>
                            </select>
                            <span style={{ color: "red" }}>*</span>

                            <br></br>

                            <label for="zip1" className="label">Zip Code:</label>
                            <input name="zip1" className="input" placeholder="87111" minLength={5} maxLength={9} required/>
                            <span style={{ color: "red" }}>*</span>
                        </div>

                        {/* ADDRESS 2 */}
                        <div className="addressBox">
                            <h1 className="subheader">Address 2</h1>

                            <label for="address2" className="label">Address 2:</label>
                            <input name="address2" className="input" placeholder="308 Negra Arroyo Lane" maxLength={100}/>

                            <br></br>

                            <label for="city2" className="label">City:</label>
                            <input name="city2" className="input" placeholder="Albuquerque" maxlength={100}/>

                            <br></br>

                            <label for="state2" className="label">State:</label>{/*display default? */}
                            <select name="state2" className="select">
                                <option value="" disabled selected>Select State</option>
                                <option value="AK">AK</option>
                                <option value="AL">AL</option>
                                <option value="AR">AR</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="IA">IA</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="MA">MA</option>
                                <option value="MD">MD</option>
                                <option value="ME">ME</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MO">MO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="NE">NE</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NV">NV</option>
                                <option value="NY">NY</option>
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
                                <option value="VA">VA</option>
                                <option value="VT">VT</option>
                                <option value="WA">WA</option>
                                <option value="WI">WI</option>
                                <option value="WV">WV</option>
                                <option value="WY">WY</option>
                            </select>

                            <br></br>

                            <label for="zip2" className="label">Zip Code:</label>
                            <input name="zip2" className="input" placeholder="87111" minLength={5} maxLength={9}/>
                        </div>
                    </div>
                </div>

                {/* ATTRIBUTES */}
                <div className="parent">
                    <div className="attributes">
                        <h1 className="header">Attributes</h1>

                        {/* FIXME: modify this after it works */}
                        <label for="skills" className="label">Skills:</label>
                        <CreatableSelect
                            name="skills"
                            className="skills"
                            options={options}
                            isMulti
                            onchange={handleChange}
                            onCreateOption={handleCreate}
                            value={selectedOptions}
                            required
                        />
                        <span style={{ color: "red" }}>*</span>

                        <br></br>

                        <label for="preferences" className="label">Preferences:</label>
                        <br></br>
                        <textarea name="preferences" className="textArea" placeholder="I like my sandwiches without the crust" maxLength={500}/>

                        <br></br>

                        {/* FIXME: modify this after it works */}
                        <label className="label">Availability:</label>
                        <DatePicker
                            multiple
                            value={selectedDates}
                            onChange={setSelectedDates}
                            format="MM-DD-YYYY"
                            sort
                        />
                        <span style={{ color: "red" }}>*</span>
                        {/* <div>
                            Selected Dates: {selectedDates.length > 0 ? selectedDates.join(", ") : "None"}
                        </div> */}
                    </div>
                </div>

                <button className="button" type="save">Save Changes</button>

            </form>


            {/* OLD CODE BELOW------------------------------------------------------------------------- */}

            {/* personal info section */}
            <div class="parent">
                <div class="child">
                    
                    <h3 class = "header">Personal Information</h3>
                
                    <span class = "field"><strong>Full Name: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        value = {fullName}
                        onChange = {(e) => setFullName(e.target.value)}
                        placeholder = "Walter Hartwell White Sr."
                        maxLength = {50}
                    />
                    <span style={{ color: 'red' }}><em>  limit 50 characters, required</em></span>
                    <br></br>

                    <span class = "field"><strong>Date of Birth: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "September 7, 1958"
                        maxLength = {50}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 50 characters, optional</em></span>
                    <br></br>

                    <span class = "field"><strong>Gender: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "Male"
                        maxLength = {50}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 50 characters, optional</em></span>
                    <br></br>
                </div>
            </div>


            

            

            {/* residence section */}
            <div class="parent">
                <div class="child">
                    <h3 class = "header">Place of Residence</h3>
            
                    {/* maybe make address 1 and 2 fields unique headers */}
                    
                    <span class = "field"><strong>Address 1: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "308 Negra Arroyo Lane"
                        maxLength = {100}
                    />
                    <span style={{ color: 'red' }}><em>  limit 100 characters, required</em></span>
                    <br></br>

                    <span class = "field"><strong>City: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "Albuquerque"
                        maxLength = {100}
                    />
                    <span style={{ color: 'red' }}><em>  limit 100 characters, required</em></span>
                    <br></br>


                    <span class = "field"><strong>State: </strong></span>
                    <select class = "value" name = "state" required>
                        <option value = "select-state" required>Select State</option>
                        <option value="AK">AK</option>
                        <option value="AL">AL</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
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
                        <option value="VA">VA</option>
                        <option value="VT">VT</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>

                    </select>
                    <span style={{ color: 'red' }}><em>  required</em></span>
                    <br></br>
                    
                    
                    <span class = "field"><strong>Zip Code: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder="87111"
                        maxLength = {9}
                    />
                    <span style={{ color: 'red' }}><em>  must be 5-9 characters, required</em></span>
                    <br></br>

                    

                    
                    <br></br>
                    <span class = "field"><strong>Address 2: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "308 Negra Arroyo Lane"
                        maxLength = {100}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 100 characters, optional</em></span>
                    <br></br>

                    <span class = "field"><strong>City: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "Albuquerque"
                        maxLength = {100}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 100 characters, optional</em></span>
                    <br></br>


                    <span class = "field"><strong>State: </strong></span>
                    <select class = "value" name = "state" required>
                        <option value = "select-state" required>Select State</option>
                        <option value="AK">AK</option>
                        <option value="AL">AL</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
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
                        <option value="VA">VA</option>
                        <option value="VT">VT</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>
                    </select>
                    <span style={{ color: 'gray' }}><em>  optional</em></span>
                    <br></br>
                    
                    
                    <span class = "field"><strong>Zip Code: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder="87111"
                        maxLength = {9}
                    />
                    <span style={{ color: 'gray' }}><em>  must be 5-9 characters, optional</em></span>
                    <br></br>
                </div>
            </div>

                    

            
            
            
            
            
            



            {/* other info section */}
            <div class="parent">
                <div class="child">
                    <h3 class = "header">Other Information</h3>
        
                    {/* Skills */}
                    <span class = "field"><strong>Skills: </strong></span>
                    <select class = "value" name = "skill" required multiple>
                        <option value = "select-skill" >Select Skill</option>
                        <option value = "communicate" >Good Communicator</option>
                        <option value = "strong" >Strong</option>
                        <option value = "creative" >Creativity</option>
                        <option value = "sales" >Sales</option>
                        <option value = "problem-solver" >Problem Solver</option>
                    </select>
                    <span style={{ color: 'red' }}><em>  required</em></span>
                    <br></br>


                    {/* <span class = value}>Chemistry, Baking, Car Washes</span>
                    <br></br> */}
                    


                    {/* Preferences */}
                    <span class = "field"><strong>Preferences: </strong></span>
                    <input
                        class = "value"
                        type = "text"
                        placeholder = "The color blue"
                        maxLength = {500}
                    />
                    <span style={{ color: 'gray' }}><em>  limit 500 characters, optional</em></span>
                    <br></br>

                    
                    
                    <span class = "field"><strong>Availability: </strong></span>
                    <select class = "value" name = "available" required multiple>
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
            </div>

            

        </div>
    )
}
 
export default EditAccount