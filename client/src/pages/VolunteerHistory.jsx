import React from 'react'
import style from "./VolunteerHistory.module.css"
 
const VolunteerHistory = () => {
    console.log("VolunteerHistory")
 
    return(
        <div>
            <h1 class = {style.pageName}>Volunteer History</h1>
            <br></br>

            {/* beach */}
            <div class = {style.parent}>
                <div class = {style.child}>
                    <h2 class = {style.eventName}>Beach Clean Up</h2>

                    <span class = {style.field}>Date:</span>
                    <span class = {style.value}>April 19, 2020</span>

                    <span class = {style.field}>Time:</span>
                    <span class = {style.value}>5:00pm</span>

                    <span class = {style.field}>Location:</span>
                    <span class = {style.value}>Galveston Beach</span>
                    
                    
                    <h4 class = {style.field}>Description:</h4>
                    <p class = {style.descValue}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Mollitia iste animi voluptatem nesciunt earum deleniti id. 
                        At consectetur labore explicabo quae eum voluptates! 
                        Ab, quod laboriosam! Quaerat officia recusandae est.
                    </p>
                </div>
            </div>
            
            {/* soup */}

            <div class = {style.parent}>
                <div class = {style.child}>

                    <h2 class = {style.eventName}>Downtown Soup Kitchen</h2>

                    <span class = {style.field}>Date:</span>
                    <span class = {style.value}>November 4, 2023</span>

                    <span class = {style.field}>Time:</span>
                    <span class = {style.value}>7:30am</span>

                    <span class = {style.field}>Location:</span>
                    <span class = {style.value}>Food Bank</span>


                    <h4 class = {style.field}>Description:</h4>
                    <p class = {style.descValue}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Mollitia iste animi voluptatem nesciunt earum deleniti id. 
                        At consectetur labore explicabo quae eum voluptates! 
                        Ab, quod laboriosam! Quaerat officia recusandae est.
                    </p>
                </div>
            </div>


            {/* gotham */}

            <div class = {style.parent}>
                <div class = {style.child}>

                    <h2 class = {style.eventName}>Gotham Retirement Home</h2>

                    <span class = {style.field}>Date:</span>
                    <span class = {style.value}>December 90, 2049</span>

                    <span class = {style.field}>Time:</span>
                    <span class = {style.value}>11:30pm</span>

                    <span class = {style.field}>Location:</span>
                    <span class = {style.value}>CSC</span>
                    
                    
                    <h4 class = {style.field}>Description:</h4>
                    <p class = {style.descValue}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Mollitia iste animi voluptatem nesciunt earum deleniti id. 
                        At consectetur labore explicabo quae eum voluptates! 
                        Ab, quod laboriosam! Quaerat officia recusandae est.
                    </p>
                </div>
            </div>
        </div>
    )
}
 
export default VolunteerHistory