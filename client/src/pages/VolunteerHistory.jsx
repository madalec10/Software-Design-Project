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
                            <span className="date">October 14, 2024</span>
                            <span> • </span>
                            <span className="time">3:40 PM</span>
                            <span> • </span>
                            <span className="location">Galveston Beach</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Organizing, Teamwork</span>
                            <span> • </span>
                            <span className="urgency">Help Necessary</span>
                        </div>

                        <p className="description">
                            Come on over to Galveston Beach to help clean up 
                            trash with your fellow volunteers! Plastic bags will 
                            be provided for participants to fill trash with. Afterwards, 
                            we will gather together as a group and sort trash into recycling
                            materials and trash materials. 
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
                            <span className="date">December 5, 2024</span>
                            <span> • </span>
                            <span className="time">9:00 AM</span>
                            <span> • </span>
                            <span className="location">Downtown Ohio Fire Department</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: None</span>
                            <span> • </span>
                            <span className="urgency">Help Needed</span>
                        </div>

                        <p className="description">
                            Calling all volunteers! Mr. Kringle needs your help this 
                            holiday season! Using the official North Pole naughty list 
                            provided by the man himself, we will be organizing coals by 
                            sizes according childrens' mischief level. Any donated coal 
                            would be appreciated. 
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
                            <span className="date">October 18, 2024</span>
                            <span> • </span>
                            <span className="time">2:30 PM</span>
                            <span> • </span>
                            <span className="location">Rincon National Park</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Time Management</span>
                            <span> • </span>
                            <span className="urgency">Help Would be Appreciated</span>
                        </div>

                        <p className="description">
                            Come together this October in nurturing a better future 
                            for mother nature. In honor of National Rincon Day, we will 
                            be planting 3,360 trees around Rincon National Park. Great 
                            opportunity for those who love nature and helping the environment. 
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
                            <span className="date">November 14, 2024</span>
                            <span> • </span>
                            <span className="time">11:00 AM</span>
                            <span> • </span>
                            <span className="location">Gotham Nursing Homes</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Communication</span>
                            <span> • </span>
                            <span className="urgency">Help Necessary</span>
                        </div>

                        <p className="description">
                            While rounding up the gang loose at Arkham Asylum, the 
                            Dark Knight needs your help rounding up the elderly
                            in the nursing homes for a good time! Help facilitate 
                            several thrilling events like bingo and charades. 
                            Includes a brief guest appearance from Justice Gang. 
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
                            <span className="date">January 8, 2025</span>
                            <span> • </span>
                            <span className="time">4:30 PM</span>
                            <span> • </span>
                            <span className="location">International Feral Animal Shelter</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Power Tools</span>
                            <span> • </span>
                            <span className="urgency">Help Would be Appreciated</span>
                        </div>

                        <p className="description">
                            The staff at the IFAS are looking into toys and structures 
                            to help relieve the stress of their residents! Join them on 
                            January of next year to create wooden climbing structures. 
                            Perfect for those who like working with their hands and 
                            enjoy socializing with feral animals. 
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
                            <span className="date">February 12, 2025</span>
                            <span> • </span>
                            <span className="time">1:30 PM</span>
                            <span> • </span>
                            <span className="location">Missouri Coca-Cola Factory</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Communication, Time Management</span>
                            <span> • </span>
                            <span className="urgency">Help Needed</span>
                        </div>

                        <p className="description">
                            The Cola-Cola Company is looking to get into the 
                            soup industry and also happens to be in a giving mood. 
                            Come volunteer for the local Missouri community in 
                            being one of the first to serve fresh hot bowls of 
                            Coca-Cola soup. 
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
                            <span className="date">October 20, 2024</span>
                            <span> • </span>
                            <span className="time">4:30 PM</span>
                            <span> • </span>
                            <span className="location">Lebron James School for Special Needs</span>
                        </div>

                        <div className="textLine">
                            <span className="skills">Skill(s) Needed: Communication</span>
                            <span> • </span>
                            <span className="urgency">Help Necessary</span>
                        </div>

                        <p className="description">
                            Come join us in the grand opening of Lebron James' special 
                            needs school. Volunteers will give tours around the campus 
                            and facilitate with delivering the end of day kindergarten 
                            curriculum. 
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}
 
export default VolunteerHistory