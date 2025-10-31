import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker"
import axios from 'axios';

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

    const { eventName } = useParams();
    const navigate = useNavigate(); // For redirecting after update

    // Set up the storing of event data
    const [eventData, setEventData] = useState({
        name: '',
        skills: [],
        urgency: '',
        date: new DateObject(),
        time: new DateObject(),
        location: '',
        volunteerCount: '',
        description: ''
    });

    const [options, setOptions] = useState(initialOptions);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // Fetch the event data based on name
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/events/${eventName}`);
                const data = response.data;

                // format the urgency                      maybe fix this later to not need it
                const mapUrgencyToValue = (urgencyText) => {
                    if (urgencyText === "Help Necessary") return "high";
                    if (urgencyText === "Help Wanted") return "medium";
                    if (urgencyText === "Help Would be Appreciated") return "low";
                    return ""; // Default case
                };

                // Format the skills to have it show up correctly
                const formattedSkills = Array.isArray(data.requiredSkills)
                    ? data.requiredSkills.map(skill => ({ value: skill, label: skill }))
                    : [];
                // Set the data 
                setEventData({
                    name: data.name || '',
                    skills: formattedSkills,
                    urgency: mapUrgencyToValue(data.urgency),
                    date: data.date ? new DateObject(data.date) : new DateObject(),
                    time: data.time ? new DateObject().setHour(data.time.split(':')[0]).setMinute(data.time.split(':')[1]) : new DateObject(),
                    location: data.location || '',
                    volunteerCount: data.volunteerCount || '',
                    description: data.description || ''
                });

            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEvent();
    }, [eventName]);

    // For handling skills selection and creation
    const handleSkillsChange = (selected) => {
        setEventData(prevData => ({
            ...prevData,
            skills: selected
        }));
    };

    // For making new skills
    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions(prev => [...prev, newOption]);
        setEventData(prevData => ({
            ...prevData,
            skills: [...(prevData.skills || []), newOption]
        }));
    };

    // To update the event data regardless if anything was actually changed
    const handleSubmit = async (e) => {
        e.preventDefault();

        // frontend constraints
        if (!eventData.skills || eventData.skills.length === 0) {
            setError("Select at least one skill");
            return;
        }

        if (eventData.date.toDate() < new Date()) {
            setError("Event date cannot be in the past");
            return;
        }

        if (eventData.location.length > 100) {
            setError("Location is too long");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const urgencyMap = {
            high: "Help Necessary",
            medium: "Help Wanted",
            low: "Help Would be Appreciated"
        };

        const updatedData = {
            name: eventName, 
            newName: eventData.name,
            description: eventData.description,
            location: eventData.location,
            volunteerCount: eventData.volunteerCount,
            urgency: urgencyMap[eventData.urgency] || eventData.urgency,
            date: eventData.date.format(),
            time: eventData.time.format("HH:mm"),
            requiredSkills: eventData.skills.map(option => option.value)
        };

        try {
            const response = await axios.put('http://localhost:8800/update-event', updatedData);

            if (response.status !== 200) {
                throw new Error('Failed to update event');
            }
            setMessage('Event updated successfully!');
            setTimeout(() => {
                navigate('/manage-events');
            }, 2000);


        } catch (err) {
            setError(err.message || 'Something went wrong');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return(
        <div>
            <form className="create-event-form" onSubmit={handleSubmit}>
                <h2>Update Event</h2>

                {/* Event name */}
                <label htmlFor="name" className="create-event-label">Event Name:</label>
                <input
                    className="create-event-input"
                    placeholder='Volunteer Clean Up'
                    name="name"
                    required
                    maxLength={100}
                    value={eventData.name} // Set the value here
                    onChange={e => setEventData({...eventData, name: e.target.value})} // And handle changes
                />

                {/* Required skills */}
                <label htmlFor="skills" className="create-event-label">Required Skills:</label>
                <CreatableSelect
                    name="skills"
                    options={options}
                    isMulti
                    onChange={handleSkillsChange}
                    onCreateOption={handleCreate}
                    value={eventData.skills}
                    className="create-event-skills"
                    required
                />

                {/* Urgency Level */}
                <label htmlFor="urgency" className="create-event-label">Urgency Level:</label>
                <select
                    className="create-event-select"
                    name="urgency"
                    required
                    value={eventData.urgency}
                    onChange={e => setEventData({...eventData, urgency: e.target.value})}
                >
                    <option value="" disabled>Select Urgency Level</option>
                    <option value="high">Help Necessary</option>
                    <option value="medium">Help Wanted</option>
                    <option value="low">Help Would be Appreciated</option>
                </select>

                {/* Date Picker */}
                <label htmlFor="date" className="create-event-label">Event Date:</label>
                <DatePicker
                  value={eventData.date}
                  onChange={date => setEventData({...eventData, date: date})}
                  format="YYYY-MM-DD"
                  className="create-event-input"
                  inputClass="date-picker"
                  required
                />

                {/* Time Picker */}
                <label htmlFor="time" className="create-event-label">Event Time:</label>
                <DatePicker
                  value={eventData.time}
                  onChange={time => setEventData({...eventData, time: time})}
                  plugins={[<TimePicker hideSeconds />]}
                  disableDayPicker
                  format="hh:mm A"
                  className="create-event-input"
                  inputClass="date-picker"
                  required
                />

                {/* Location Text Field */}
                <label htmlFor="location" className="create-event-label">Event Location:</label>
                <input
                    type="text"
                    className="create-event-input"
                    name="location"
                    placeholder='123 parkplace 74029 NY'
                    required
                    maxLength={100}
                    value={eventData.location}
                    onChange={e => setEventData({...eventData, location: e.target.value})}
                />

                {/* Volunteer Count */}
                <label htmlFor="volunteer-count" className="create-event-label">Number of Volunteers Needed:</label>
                <input
                    type="number"
                    className="create-event-input"
                    name="volunteer-count"
                    placeholder='1-100'
                    required
                    min="1"
                    max="100"
                    value={eventData.volunteerCount}
                    onChange={e => setEventData({...eventData, volunteerCount: e.target.value})}
                />

                {/* Description */}
                <label htmlFor="description" className="create-event-label">Event Description:</label>
                <textarea
                    className="create-event-textarea"
                    name="description"
                    placeholder="Describe the event..."
                    required
                    maxLength={500}
                    value={eventData.description}
                    onChange={e => setEventData({...eventData, description: e.target.value})}
                ></textarea>

                <button className="create-event-button" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Event'}
                </button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}

export default UpdateEvent