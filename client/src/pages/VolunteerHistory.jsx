import React from 'react'
import './VolunteerHistory.css'

// FIXME: after css finished, add -VH suffix to all classes

/*
events: 

BEACH: galveston beach clean up
COAL: coal for naughty kids drive
TREE: rincon park tree planting
NURSE: gotham nursing homes assistance
FERAL: feral animal shelter assistance
SOUP: downtown houston soup kitchen
LEBRON: lebron james school for special needs
*/
 
const VolunteerHistory = () => {
    console.log("VolunteerHistory")
 
    return(
        <div>
            {/* PAGE TITLE */}
            <div className="parentTitle">
                <div className="title">
                    <h1 className="pageName">Volunteer History</h1>
                </div>
            </div>
            
            {/* BEACH */}
            <div className="parent">
                <div className="child">
                    <div className="beach">
                        <h1 className="header">Beach Clean Up</h1>

                        <span className="day">October 14, 2025</span>
                        <span className="time">3:40 PM</span>
                        <span className="location">Galveston Beach</span>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* COAL */}
            {/* TREE */}
            {/* NURSE */}
            {/* FERAL */}
            {/* SOUP */}
            {/* LEBRON */}
    

        </div>
    )
}
 
export default VolunteerHistory