import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import "./CreateEvent.css";

const initialOptions = [
    { value: "Organizing", label: "Organizing" },
    { value: "Power Tools", label: "Power Tools" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Communication", label: "Communication" },
    { value: "Time Management", label: "Time Management" }
];

const CreateEvent = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(initialOptions);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setOptions((prev) => [...prev, newOption]);
        setSelectedOptions((prev) => [...(prev || []), newOption]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const formData = new FormData(e.target);

            const data = {
                name: formData.get('name'),
                description: formData.get('description'),
                location: formData.get('location'),
                volunteersNeeded: formData.get('volunteer-count'),
                urgency: formData.get('urgency'),
                date: formData.get('date'),
                time: formData.get('time'),
                requiredSkills: (selectedOptions || []).map(opt => opt.value).join(', '),
            };

            const response = await fetch('http://localhost:8800/create-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Failed to create event');
            }

            const result = await response.json();
            setMessage('Event created successfully!');
            console.log('Success:', result);

            e.target.reset();
            setSelectedOptions([]);
            navigate('/manage-events');

        } catch (err) {
            setError(err.message || 'Something went wrong');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="create-event-form" onSubmit={handleSubmit}>
                <h2>Create Event</h2>

                <label htmlFor="name" className="create-event-label">Event Name:</label>
                <input
                    className="create-event-input"
                    placeholder='Volunteer Clean Up'
                    name="name"
                    id="name"
                    required
                    maxLength={100}
                />

                <label htmlFor="skills" className="create-event-label">Required Skills:</label>
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

                <label htmlFor="urgency" className="create-event-label">Urgency Level:</label>
                <select
                    className="create-event-select"
                    name="urgency"
                    id="urgency"
                    required
                    defaultValue=""
                >
                    <option value="" disabled>Select Urgency Level</option>
                    <option value="high">Help Necessary</option>
                    <option value="medium">Help Wanted</option>
                    <option value="low">Help Would be Appreciated</option>
                </select>

                <label htmlFor="date" className="create-event-label">Event Date:</label>
                <input
                    type="date"
                    className="create-event-input"
                    name="date"
                    id="date"
                    required
                />

                <label htmlFor="time" className="create-event-label">Event Time:</label>
                <input
                    type="time"
                    className="create-event-input"
                    name="time"
                    id="time"
                    required
                />

                <label htmlFor="location" className="create-event-label">Event Location:</label>
                <input
                    type="text"
                    className="create-event-input"
                    name="location"
                    id="location"
                    placeholder='123 parkplace 74029 NY'
                    required
                />

                <label htmlFor="volunteer-count" className="create-event-label">Number of Volunteers Needed:</label>
                <input
                    type="number"
                    className="create-event-input"
                    name="volunteer-count"
                    id="volunteer-count"
                    placeholder='1-100'
                    required
                    min="1"
                    max="100"
                />

                <label htmlFor="description" className="create-event-label">Event Description:</label>
                <textarea
                    className="create-event-textarea"
                    name="description"
                    id="description"
                    placeholder="Describe the event..."
                    required
                    maxLength={500}
                ></textarea>

                <button className="create-event-button" type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                </button>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default CreateEvent;
