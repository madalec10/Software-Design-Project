import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";

import "./CreateEvent.css";

const initialOptions = [
  { value: "Organizing", label: "Organizing" },
  { value: "Power Tools", label: "Power Tools" },
  { value: "Teamwork", label: "Teamwork" },
  { value: "Communication", label: "Communication" },
  { value: "Time Management", label: "Time Management" }
];

const CreateEvent = () => {
    console.log("CreateEvent")
 
    return(
        <div>
            Create Event
        </div>
    )
}
 
export default CreateEvent