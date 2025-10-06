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

// FIXME: are locations supposed to be an actual address
// or can they also be names of locations? 
 
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

                        <div className="textLine">
                           <span className="date">October 14, 2025</span>
                            <span> • </span>
                            <span className="time">3:40 PM</span>
                            <span> • </span>
                            <span className="location">Galveston Beach</span>
                        </div>

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
            <div className="parent">
                <div className="child">
                    <div className="coal">
                        <h1 className="header">Kids Coal Drive</h1>

                        <div className="textLine">
                            <span className="date">December 5, 2025</span>
                            <span> • </span>
                            <span className="time">9:00 AM</span>
                            <span> • </span>
                            <span className="location">Downtown Ohio Fire Department</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* TREE */}
            <div className="parent">
                <div className="child">
                    <div className="tree">
                        <h1 className="header">Tree Planting</h1>

                        <div className="textLine">
                            <span className="date">October 18, 2025</span>
                            <span> • </span>
                            <span className="time">2:30 PM</span>
                            <span> • </span>
                            <span className="location">Rincon National Park</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* NURSE */}
            <div className="parent">
                <div className="child">
                    <div className="nurse">
                        <h1 className="header">Nursing Homes</h1>

                        <div className="textLine">
                            <span className="date">November 14, 2025</span>
                            <span> • </span>
                            <span className="time">11:00 AM</span>
                            <span> • </span>
                            <span className="location">Gotham Nursing Homes</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* FERAL */}
            <div className="parent">
                <div className="child">
                    <div className="feral">
                        <h1 className="header">Animal Shelter</h1>

                        <div className="textLine">
                            <span className="date">January 8, 2026</span>
                            <span> • </span>
                            <span className="time">4:30 PM</span>
                            <span> • </span>
                            <span className="location">International Feral Animal Shelter</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* SOUP */}
            <div className="parent">
                <div className="child">
                    <div className="soup">
                        <h1 className="header">Soup Kitchen</h1>

                        <div className="textLine">
                            <span className="date">February 12, 2026</span>
                            <span> • </span>
                            <span className="time">1:30 PM</span>
                            <span> • </span>
                            <span className="location">Missouri Coca-Cola Factory</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>

            {/* LEBRON */}
            <div className="parent">
                <div className="child">
                    <div className="lebron">
                        <h1 className="header">Special Needs School</h1>

                        <div className="textLine">
                            <span className="date">October 20, 2025</span>
                            <span> • </span>
                            <span className="time">4:30 PM</span>
                            <span> • </span>
                            <span className="location">Lebron James School for Special Needs</span>
                        </div>

                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia exercitationem facilis eos nulla reiciendis iusto 
                            deserunt nisi totam ad ipsa iste itaque, dicta dolor 
                            quidem delectus aut fugiat asperiores quod.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}
 
export default VolunteerHistory