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

// NOTE TO SELF: add a load more button after 4 events

// NICE TO HAVE: side by side events
 
const VolunteerHistory = () => {
    console.log("VolunteerHistory")
 
    return(
        <div>
            {/* PAGE TITLE */}
            <div className="parentTitleVH">
                <div className="titleVH">
                    <h1 className="pageNameVH">Volunteer History</h1>
                </div>
            </div>
            
            {/* BEACH */}
            <div className="parentVH">
                <div className="childVH">
                    <div className="beachVH">
                        <h1 className="headerVH">Beach Clean Up</h1>

                        <div className="textLineVH">
                            <span className="dateVH">October 14, 2024</span>
                            <span> • </span>
                            <span className="timeVH">3:40 PM</span>
                            <span> • </span>
                            <span className="locationVH">Galveston Beach</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skillsVH">Skill(s) Needed: Organizing, Teamwork</span>
                            <span> • </span>
                            <span className="urgencyVH">Help Necessary</span>
                        </div>

                        <p className="descriptionVH">
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
            <div className="parentVH">
                <div className="childVH">
                    <div className="coalVH">
                        <h1 className="headerVH">Kids Coal Drive</h1>

                        <div className="textLineVH">
                            <span className="dateVH">December 5, 2024</span>
                            <span> • </span>
                            <span className="timeVH">9:00 AM</span>
                            <span> • </span>
                            <span className="locationVH">Downtown Ohio Fire Department</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skillsVH">Skill(s) Needed: None</span>
                            <span> • </span>
                            <span className="urgencyVH">Help Needed</span>
                        </div>

                        <p className="descriptionVH">
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
            <div className="parentVH">
                <div className="childVH">
                    <div className="treeVH">
                        <h1 className="headerVH">Tree Planting</h1>

                        <div className="textLineVH">
                            <span className="dateVH">October 18, 2024</span>
                            <span> • </span>
                            <span className="timeVH">2:30 PM</span>
                            <span> • </span>
                            <span className="locationVH">Rincon National Park</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skills">Skill(s) Needed: Time Management</span>
                            <span> • </span>
                            <span className="urgency">Help Would be Appreciated</span>
                        </div>

                        <p className="descriptionVH">
                            Come together this October in nurturing a better future 
                            for mother nature. In honor of National Rincon Day, we will 
                            be planting 3,360 trees around Rincon National Park. Great 
                            opportunity for those who love nature and helping the environment. 
                        </p>
                    </div>
                </div>
            </div>

            {/* NURSE */}
            <div className="parentVH">
                <div className="childVH">
                    <div className="nurseVH">
                        <h1 className="headerVH">Nursing Homes</h1>

                        <div className="textLineVH">
                            <span className="dateVH">November 14, 2024</span>
                            <span> • </span>
                            <span className="timeVH">11:00 AM</span>
                            <span> • </span>
                            <span className="locationVH">Gotham Nursing Homes</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skills">Skill(s) Needed: Communication</span>
                            <span> • </span>
                            <span className="urgency">Help Necessary</span>
                        </div>

                        <p className="descriptionVH">
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
            <div className="parentVH">
                <div className="childVH">
                    <div className="feralVH">
                        <h1 className="headerVH">Animal Shelter</h1>

                        <div className="textLineVH">
                            <span className="dateVH">January 8, 2025</span>
                            <span> • </span>
                            <span className="timeVH">4:30 PM</span>
                            <span> • </span>
                            <span className="locationVH">International Feral Animal Shelter</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skills">Skill(s) Needed: Power Tools</span>
                            <span> • </span>
                            <span className="urgency">Help Would be Appreciated</span>
                        </div>

                        <p className="descriptionVH">
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
            <div className="parentVH">
                <div className="childVH">
                    <div className="soupVH">
                        <h1 className="headerVH">Soup Kitchen</h1>

                        <div className="textLineVH">
                            <span className="dateVH">February 12, 2025</span>
                            <span> • </span>
                            <span className="timeVH">1:30 PM</span>
                            <span> • </span>
                            <span className="locationVH">Missouri Coca-Cola Factory</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skills">Skill(s) Needed: Communication, Time Management</span>
                            <span> • </span>
                            <span className="urgency">Help Needed</span>
                        </div>

                        <p className="descriptionVH">
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
            <div className="parentVH">
                <div className="childVH">
                    <div className="lebronVH">
                        <h1 className="headerVH">Special Needs School</h1>

                        <div className="textLineVH">
                            <span className="dateVH">October 20, 2024</span>
                            <span> • </span>
                            <span className="timeVH">4:30 PM</span>
                            <span> • </span>
                            <span className="locationVH">Lebron James School for Special Needs</span>
                        </div>

                        <div className="textLineVH">
                            <span className="skills">Skill(s) Needed: Communication</span>
                            <span> • </span>
                            <span className="urgency">Help Necessary</span>
                        </div>

                        <p className="descriptionVH">
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