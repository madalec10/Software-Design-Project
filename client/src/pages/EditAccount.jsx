import React, { useState } from 'react';
import './EditAccount.css';

import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-multi-date-picker';
import { Navigate } from "react-router-dom";

const initialOptions = [
  { value: "Organizing", label: "Organizing" },
  { value: "Power Tools", label: "Power Tools" },
  { value: "Teamwork", label: "Teamwork" },
  { value: "Communication", label: "Communication" },
  { value: "Time Management", label: "Time Management" }
];

const EditAccount = () => {
  // All hooks at the top!
  const [goToAccountDetails, setGoToAccountDetails] = useState(false);
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // date of birth
  const [selectedDates, setSelectedDates] = useState([]); // for availability
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState(initialOptions);
  const [address1, setAddress1] = useState("");
  const [city1, setCity1] = useState("");
  const [state1, setState1] = useState("");
  const [zip1, setZip1] = useState("");
  const [gender, setGender] = useState("");
  const[preferences, setPreferences] = useState("");
  const fetchUserProfile = async () => {
    const res = await fetch("http://localhost:8800/user-info", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return; //

    const p = await res.json();

    setFullName(p.FullName || "");
    setDateOfBirth(p.DateOfBirth || "");
    setGender(p.Gender || "");
    setAddress1(p.Address1 || "");
    setCity1(p.City || "");
    setState1(p.State || "");
    setZip1(p.ZipCode || "");
    setPreferences(p.Preferences || "");

    const skillsArr = Array.isArray(p.Skills)
      ? p.Skills
      : typeof p.Skills === "string"
        ? p.Skills.split(",").map(s => s.trim()).filter(Boolean)
        : [];
    setSelectedOptions(skillsArr.map(s => ({ value: s, label: s })));

    const availArr = Array.isArray(p.Availability)
      ? p.Availability
      : typeof p.Availability === "string"
        ? p.Availability.split(",").map(s => s.trim()).filter(Boolean)
        : [];
    setSelectedDates(availArr);
    setOptions(prev => {
      const seen = new Set(prev.map(o => o.value));
      return [...prev, ...skillsArr.filter(s => !seen.has(s)).map(s => ({ value: s, label: s }))];
    });
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);
  if (goToAccountDetails) {
    return <Navigate to="/account-details" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");
    if (!email) return alert("User email not found");

    if (!fullName) return alert("Full Name is required");
    if (!dateOfBirth) return alert("Date of Birth is required");
    if (!gender) return alert("Gender is required");
    if (!address1) return alert("Address 1 is required");
    if (!city1) return alert("City is required");
    if (!state1) return alert("State is required");
    if (!zip1 || zip1.length < 5 || zip1.length > 9) return alert("Zip code must be 5-9 characters");
    if (!selectedOptions || selectedOptions.length === 0) return alert("Select at least one skill");
    if (!selectedDates || selectedDates.length === 0) return alert("Select at least one availability date");

    const userProfile = {
      email,
      FullName: fullName,
      DateOfBirth: dateOfBirth,           // ISO: "YYYY-MM-DD"
      Gender: gender,
      Address1: address1,
      City: city1,
      State: state1,
      ZipCode: zip1,
      Skills: (selectedOptions || []).map(option => option.value),
      Preferences: e.target.preferences?.value || "",
      Availability: (selectedDates || []).length > 0
        ? selectedDates.map(date => (date.format ? date.format("YYYY-MM-DD") : date))
        : []
    };

    // strip empty strings, null/undefined, and empty arrays
    for (const key in userProfile) {
      const v = userProfile[key];
      if (
        v === "" ||
        v === null ||
        v === undefined ||
        (Array.isArray(v) && v.length === 0)
      ) {
        delete userProfile[key];
      }
    }

    const response = await fetch('http://localhost:8800/update-user-profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userProfile),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Profile Updated Successfully");
      setGoToAccountDetails(true);
    } else {
      const err = await response.json().catch(() => null);
      alert(err?.error || "Failed to update profile");
    }
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions(prev => [...prev, newOption]);
    setSelectedOptions(prev => [...(prev || []), newOption]);
  };

  return (
    <div>
      {/* PAGE TITLE */}
      <div className="parentTitleEA">
        <div className="titleEA">
          <h1 className="pageNameEA">Edit Account</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <ul className="grandparentEA">
          {/* PERSONAL INFORMATION */}
          <li className="parentEA">
            <div className="personalEA">
              <h1 className="headerEA">Personal Information</h1>

              <label htmlFor="fullName" className="labelEA">Full Name:</label>
              <input
                id="fullName"
                name="fullName"
                className="inputEA"
                maxLength={50}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <br />

              <label htmlFor="birth" className="labelEA">Date of Birth:</label>
              <input
                id="birth"
                name="birth"
                className="inputEA"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />

              <br />

              <label htmlFor="gender" className="labelEA">Gender:</label>
              <select
                id="gender"
                name="gender"
                className="selectEA"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option> {/* display default? */}
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </li>

          {/* CONTACT INFORMATION */}
          <li className="parentEA">
            <div className="contactEA">
              <h1 className="headerEA">Contact Information</h1>

              {/* ADDRESS 1 */}
              <div className="addressBoxEA">
                <h1 className="subHeaderEA">Address 1</h1>

                <label htmlFor="address1" className="labelEA">Address 1:</label>
                <input
                  id="address1"
                  name="address1"
                  className="inputEA"

                  maxLength={100}
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />

                <br />

                <label htmlFor="city1" className="labelEA">City:</label>
                <input
                  id="city1"
                  name="city1"
                  className="inputEA"
                  placeholder="Albuquerque"
                  maxLength={100}
                  value={city1}
                  onChange={(e) => setCity1(e.target.value)}
                />

                <br />

                <label htmlFor="state1" className="labelEA">State:</label>
                <select
                  id="state1"
                  name="state1"
                  className="selectEA"
                  value={state1}
                  onChange={(e) => setState1(e.target.value)}
                >
                  <option value="" disabled>Select State</option>
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

                <br />

                <label htmlFor="zip1" className="labelEA">Zip Code:</label>
                <input
                  id="zip1"
                  name="zip1"
                  className="inputEA"
                  placeholder="87111"
                  minLength={5}
                  maxLength={9}
                  value={zip1}
                  onChange={(e) => setZip1(e.target.value)}
                />
              </div>

              {/* ADDRESS 2 (UI-only for now) */}
              <div className="addressBoxEA">
                <h1 className="subHeaderEA">Address 2</h1>

                <label htmlFor="address2" className="labelEA">Address 2:</label>
                <input id="address2" name="address2" className="inputEA" placeholder="308 Negra Arroyo Lane" maxLength={100} />

                <br />

                <label htmlFor="city2" className="labelEA">City:</label>
                <input id="city2" name="city2" className="inputEA" placeholder="Albuquerque" maxLength={100} />

                <br />

                <label htmlFor="state2" className="labelEA">State:</label>
                <select id="state2" name="state2" className="selectEA">
                  <option value="" disabled>Select State</option>
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

                <br />

                <label htmlFor="zip2" className="labelEA">Zip Code:</label>
                <input id="zip2" name="zip2" className="inputEA" placeholder="87111" minLength={5} maxLength={9} />
              </div>
            </div>
          </li>

          {/* ATTRIBUTES */}
          <li className="parentEA">
            <div className="attributesEA">
              <h1 className="headerEA">Attributes</h1>

              <label htmlFor="skills" className="labelEA">Skills:</label>
              <CreatableSelect
                inputId="skills"
                name="skills"
                className="multiSelectEA"
                options={options}
                isMulti
                onChange={handleChange}
                onCreateOption={handleCreate}
                value={selectedOptions}
              />

              <br />

              <label htmlFor="preferences" className="labelEA">Preferences:</label>
              <br />
              <textarea id="preferences" name="preferences" className="textAreaEA" placeholder="No crust on sandwiches" maxLength={500} value={preferences} onChange={(e) => setPreferences(e.target.value)} />
              <br />

              <br />

              <label className="labelEA">Availability:</label>
              <DatePicker
                className="availablEA"
                multiple
                value={selectedDates}
                onChange={setSelectedDates}
                format="MM-DD-YYYY"
                sort
              />
            </div>
          </li>
        </ul>

        <div className="buttonEA">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
