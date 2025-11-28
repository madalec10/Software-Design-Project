// src/ManageVolunteers.jsx
import React, { useEffect, useState } from "react";
import "./ManageVolunteers.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const ManageVolunteers = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [filterTime, setFilterTime] = useState("all");
  const [sortTitle, setSortTitle] = useState("none");

  useEffect(() => {
    fetchEventsAndVolunteers()
  }, []);

  //  the new events loading
  // checks for email or event name filtering
  // if none, get all events
  const fetchEventsAndVolunteers = async (emailFilter = null, eventFilter = null) => {
    try {
      setLoading(true);
      setError("");
      
      let Events = [];

      if (emailFilter) {
        // filter for email
        const eventsRes = await fetch(`http://localhost:8800/volunteer-history-authless?email=${encodeURIComponent(emailFilter)}`, { 
          credentials: "include" 
        });

        const eventsData = await eventsRes.json();
        Events = Array.isArray(eventsData) ? eventsData : [];
      } else {
        // no filters 
        // grabs all events
        const eventsRes = await fetch("http://localhost:8800/events", { 
          credentials: "include" 
        });

        const eventsData = await eventsRes.json();
        Events = Array.isArray(eventsData) ? eventsData : [];
      }


      // if event filtering
      let filteredEvents = Events;
      if (eventFilter) {
        const lowerName = eventFilter.toLowerCase();
        // filter the events to show event name
        filteredEvents = Events.filter(event =>
          event.name.toLowerCase().includes(lowerName)
        );
      }

      // get all the volunteers for events
      const eventsWithVolunteers = await Promise.all(
        filteredEvents.map(async (event) => {
          const eventID = event.eventID;

          try {
            if (!eventID) return { ...event, volunteers: [] };

            const volRes = await fetch(`http://localhost:8800/event/volunteers/${eventID}`,{ 
              credentials: "include" 
            });

            if (!volRes.ok) {
              console.error(`Failed volunteer fetch for eventID ${eventID}:`, volRes.status);
              return { ...event, volunteers: [] };
            }

            const volunteerRows = await volRes.json();
            const volunteerNames = Array.isArray(volunteerRows)
              ? volunteerRows.map((v) => v.name).filter(Boolean)
              : [];

            return { ...event, volunteers: volunteerNames };
          } catch (err) {
            console.error(`Error fetching volunteers for eventID ${eventID}:`, err);
            return { ...event, volunteers: [] };
          }
        })
      );

      setEvents(eventsWithVolunteers);
    } catch (err) {
      console.error("ManageVolunteers fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterByTime = (events, filterTime) => {
    const now = new Date();//compare to time now

    return events.filter((event) => {
      const eventDate = new Date(event.date);

      if (filterTime === "upcoming") return eventDate >= now;
      if (filterTime === "past") return eventDate < now;
      else return true;//"all"
    });
  };

  const filterByName = (events, sortTitle) => {
    const sorted = [...events];

    if (sortTitle === "ascend") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (sortTitle === "descend") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    //otherwise, don't sort

    return sorted;
  };

  const formatSkills = (skills) => {
    if (!skills) return "";
    return Array.isArray(skills) ? skills.join(", ") : String(skills);
  };

  const formatVolunteers = (volunteers) => {
    if (!Array.isArray(volunteers) || volunteers.length === 0) {
      return "None yet";
    }
    return volunteers.join(", ");
  };

  if (loading) {
    return (
      <div className="ManageVolunteers-Wrapper">
        <h1>Manage Volunteers</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ManageVolunteers-Wrapper">
        <h1>Manage Volunteers</h1>
        <p className="ManageVolunteers-Error">Error: {error}</p>
      </div>
    );
  }

  // handle submit for filtering
  const handleFilterSubmit = () => {
    const email = filterEmail.trim();
    const eventName = filterEvent.trim();

    fetchEventsAndVolunteers(email, eventName);
  };

  // handle reset button
  const handleResetFilter = () => {
    setFilterEmail("");
    setFilterEvent("");
    setFilterTime("all");
    setSortTitle("none");
    fetchEventsAndVolunteers();
  };

  let filteredAndSortedEvents = filterByTime(events, filterTime);
  filteredAndSortedEvents = filterByName(filteredAndSortedEvents, sortTitle);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Volunteer Event Report", 14, 22);

    const tableColumn = [
      "Event",
      "Date",
      "Time",
      "Location",
      "Skills Required",
      "Urgency",
      "Volunteers Needed",
      "Volunteers"
    ];

    const tableRows = [];

    filteredAndSortedEvents.forEach(event => {
      tableRows.push([
        event.name,
        event.date,
        event.time,
        event.location,
        formatSkills(event.requiredSkills),
        event.urgency,
        event.volunteerCount ?? event.volunteersNeeded,
        formatVolunteers(event.volunteers)
      ]);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 }
    });

    doc.save("volunteer-events.pdf");
  };


  return (
    <div className="ManageVolunteers-Wrapper">
      <h1>Manage Volunteers</h1>

      {/* search bar stuff */}
      <div className="Filters-Section-Container"> 
        
        <div className="Filters-Input-Group">
            
            <div className="Filter-Item">
                <p>Filter by Volunteer Email:</p>
                <div className="Filter-Input-Button">
                    <input 
                      type="email" 
                      placeholder= "volunteer@gmail.com"
                      value={filterEmail}
                      onChange={(e) => setFilterEmail(e.target.value)}
                    />
                    <button onClick={handleFilterSubmit}>Filter</button>
                </div>
            </div>

            <div className="Filter-Item">
                <p>Filter by Event Name:</p>
                <div className="Filter-Input-Button">
                    <input
                      type="text"
                      placeholder="Neighborhood Cleanup"
                      value={filterEvent}
                      onChange={(e) => setFilterEvent(e.target.value)}
                    />
                    <button onClick={handleFilterSubmit}>Filter</button> 
                </div>
            </div>

            <div className="Filter-Item">
              <p>Filter by Time:</p>
              <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)}>
                <option value="all">All</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            <div className="Filter-Item">
              <p>Sort by Event Name:</p>
              <select value={sortTitle} onChange={(e) => setSortTitle(e.target.value)}>
                <option value="none">None</option>
                <option value="ascend">A - Z</option>
                <option value="descend">Z - A</option>
              </select>
            </div>

        </div> 
    
    <div className="Filters-Reset-Buttons">
      <button className="reset-button" onClick={handleResetFilter}>Reset</button>
      <button className="reset-button" onClick={exportPDF}>Get PDF</button>
      <button className="reset-button">Get CSV</button>
    </div>

      </div> 

      

      {filteredAndSortedEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="ManageVolunteers-TableContainer">
          <table className="ManageVolunteers-Table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Skills Required</th>
                <th>Urgency</th>
                <th>Volunteers Needed</th>
                <th>Volunteers</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEvents.map((event) => (
                <tr key={event.eventID}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>{formatSkills(event.requiredSkills)}</td>
                  <td>{event.urgency}</td>
                  <td>{event.volunteerCount ?? event.volunteersNeeded}</td>
                  <td>{formatVolunteers(event.volunteers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageVolunteers;
