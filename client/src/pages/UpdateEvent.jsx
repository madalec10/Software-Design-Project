import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { useState } from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker"


import "./CreateEvent.css"

const initialOptions = [
    { value: "Organizing", label: "Organizing" },
    { value: "Power Tools", label: "Power Tools" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Communication", label: "Communication" },
    { value: "Time Management", label: "Time Management" }
];

const UpdateEvent = () => {
    console.log("UpdateEvent")

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(initialOptions);

    // For handling skills selection and creation
    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    // For making new skills
    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions(prev => [...prev, newOption]);
        setSelectedOptions(prev => [...(prev || []), newOption]);
    };

    // For handling date selection
    const [values, setValues] = useState([new DateObject()]);

    return(
        <div>
            <form className="create-event-form">
                <h2>Create Event</h2>

                {/* Event name */}
                <label for="name" className="create-event-label">Event Name:</label>
                <input className="create-event-input" placeholder='Volunteer Clean Up' name="name" required maxLength={100}/>
                
                {/* Required skills */}
                <label for="skills" className="create-event-label">Required Skills:</label>
                <CreatableSelect
                    name="skills"
                    options={options}
                    isMulti
                    onChange={handleChange}
                    onCreateOption={handleCreate}
                    value={selectedOptions}
                    className="create-event-skills"
                    required
                />

                {/* Urgency Level */}
                <label for="urgency" className="create-event-label">Urgency Level:</label>
                <select className="create-event-select" name="urgency" required>
                    <option value="" disabled selected required>Select Urgency Level</option>
                    <option value="high">Help Necessary</option>
                    <option value="medium">Help Wanted</option>
                    <option value="low">Help Would be Appreciated</option>
                </select>

                <label for="date" className="create-event-label">Event Date and Time:</label>
                <DatePicker
                    format="MM/DD/YYYY HH:mm"
                    value={values}
                    onChange={setValues}
                    plugins={[<TimePicker hideSeconds/>]} 
                    range
                    rangeHover
                    className="create-event-input"
                    required
                    inputClass="date-picker"
                />

                <label for="location" className="create-event-label">Event Location:</label>
                <input type="text" className="create-event-input" name="location" placeholder='123 parkplace 74029 NY'required/>

                <label for="volunteer-count" className="create-event-label">Number of Volunteers Needed:</label>
                <input type="number" className="create-event-input" name="volunteer-count" placeholder='1-100' required min="1" max="100" />

                <label for="description" className="create-event-label">Event Description:</label>
                <textarea className="create-event-textarea" name="description" placeholder="Describe the event..." required maxLength={500}></textarea>

                <button className="create-event-button" type="submit">Create Event</button>
            </form>
        </div>
    )
}
 
export default UpdateEvent