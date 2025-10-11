import React from 'react';
import './EditAccount.css';

import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-multi-date-picker';
import { useState } from 'react';

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
            <div className="parentTitleEA">
                <div className="titleEA">
                    <h1 className="pageNameEA">Edit Account</h1>
                    <p className="requiredEA" style={{ color: "red" }}>* <em>required</em></p>
                </div>
            </div>

            <form>
                <ul className="grandparentEA">
                    {/* PERSONAL INFORMATION */}
                    <li className="parentEA">
                        <div className="personalEA">
                            <h1 className="headerEA">Personal Information</h1>
                            
                            <label for="fullName" className="labelEA">Full Name:</label>
                            <input name="fullName" className="inputEA" placeholder="Walter Hartwell White Sr." maxLength={50} required/>
                            <span style={{ color: "red" }}>*</span>

                            <br></br>
                            
                            <label htmlFor="birth" className="labelEA">Date of Birth:</label>
                            <input id="birth" name="birth" className="inputEA" type="date" value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}/> 

                            <br></br>

                            <label for="gender" className="labelEA">Gender:</label>
                            <select name="gender" className="selectEA">
                                <option value="" disabled selected>Select Gender</option>
                                <option value="male">Male</option> {/*display default?*/}
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </li>

                    {/* CONTACT INFORMATION */}
                    <li className="parentEA">
                        <div className="contactEA">
                            <h1 className="headerEA">Contact Information</h1>

                            {/* ADDRESS 1 */}
                            <div className="addressBoxEA">
                                <h1 className="subHeaderEA">
                                    Address 1
                                    {/* <span style={{ color: "red" }}>*</span> */}
                                </h1>

                                <label for="address1" className="labelEA">Address 1:</label>
                                <input name="address1" className="inputEA" placeholder="308 Negra Arroyo Lane" maxLength={100} required/>
                                <span style={{ color: "red" }}>*</span>

                                <br></br>

                                <label for="city1" className="labelEA">City:</label>
                                <input name="city1" className="inputEA" placeholder="Albuquerque" maxlength={100} required/>
                                <span style={{ color: "red" }}>*</span>

                                <br></br>

                                <label for="state1" className="labelEA">State:</label>{/*display default? */}
                                <select name="state1" className="selectEA" required>
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

                                <label for="zip1" className="labelEA">Zip Code:</label>
                                <input name="zip1" className="inputEA" placeholder="87111" minLength={5} maxLength={9} required/>
                                <span style={{ color: "red" }}>*</span>
                            </div>

                            {/* ADDRESS 2 */}
                            <div className="addressBoxEA">
                                <h1 className="subHeaderEA">Address 2</h1>

                                <label for="address2" className="labelEA">Address 2:</label>
                                <input name="address2" className="inputEA" placeholder="308 Negra Arroyo Lane" maxLength={100}/>

                                <br></br>

                                <label for="city2" className="labelEA">City:</label>
                                <input name="city2" className="inputEA" placeholder="Albuquerque" maxlength={100}/>

                                <br></br>

                                <label for="state2" className="labelEA">State:</label>{/*display default? */}
                                <select name="state2" className="selectEA">
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

                                <label for="zip2" className="labelEA">Zip Code:</label>
                                <input name="zip2" className="inputEA" placeholder="87111" minLength={5} maxLength={9}/>
                            </div>
                        </div>
                    </li>

                    {/* ATTRIBUTES */}
                    <li className="parentEA">
                        <div className="attributesEA">
                            <h1 className="headerEA">Attributes</h1>

                            {/* FIXME: modify this after it works */}
                            <label for="skills" className="labelEA">Skills:</label>
                            <CreatableSelect
                                name="skills"
                                className="multiSelectEA"
                                options={options}
                                isMulti
                                onChange={handleChange}
                                onCreateOption={handleCreate}
                                value={selectedOptions}
                                required
                            />
                            <span style={{ color: "red" }}>*</span>

                            <br></br>

                            <label for="preferences" className="labelEA">Preferences:</label>
                            <br></br>
                            <textarea name="preferences" className="textAreaEA" placeholder="No crust on sandwiches" maxLength={500}/>

                            <br></br>

                            {/* FIXME: modify this after it works */}
                            <label className="labelEA">Availability:</label>
                            <DatePicker
                                className="availablEA"
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
                    </li>
                </ul>

                <div className="buttonEA" >
                    <button type="save">Save Changes</button>
                </div>

            </form>
            

        </div>
    )
}
 
export default EditAccount
