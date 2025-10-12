import app from "../app.js";
import express from "express";
let events = [
    {
        name: "Beach Clean Up",
        description: " Come on over to Galveston Beach to help clean up trash with your fellow volunteers! Plastic bags will be provided for participants to fill trash with. Afterwards, we will gather together as a group and sort trash into recyclingmaterials and trash materials.",
        location: "Galveston Beach",
        requiredSkills: "Organizing, Teamwork",
        urgency: "Help Necessary",
        date: "10/14/24",
        time: " 3:40 PM",
        volunteersNeeded: "10"

    },
    {
        name: "Kids Coal Drive",
        description: "Calling all volunteers! Mr. Kringle needs your help this holiday season! Using the official North Pole naughty list provided by the man himself, we will be organizing coals by sizes according childrens' mischief level. Any donated coal would be appreciated.",
        location: "Downtown Ohio Fire Department",
        requiredSkills: "None",
        urgency: "Help Needed",
        date: "12/5/24",
        time: "9:00 AM",
        volunteersNeeded: "10"

    },
    {
        name: "Tree Planting",
        description: "Come together this October in nurturing a better future for mother nature. In honor of National Rincon Day, we will be planting 3,360 trees around Rincon National Park. Great opportunity for those who love nature and helping the environment.",
        location: "Rincon National Park",
        requiredSkills: "Time Management",
        urgency: "Help Would be Appreciated",
        date: "10/18/24",
        time: "2:30 PM",
        volunteersNeeded: "30"
    },
    {
        name: "Nursing Homes",
        description: "While rounding up the gang loose at Arkham Asylum, the Dark Knight needs your help rounding up the elderlyin the nursing homes for a good time! Help facilitate several thrilling events like bingo and charades. Includes a brief guest appearance from Justice Gang.",
        location: "Gotham Nursing Homes",
        requiredSkills: "Communication",
        urgency: "Help Necessary",
        date: "11/14/24",
        time: "11:00 AM",
        volunteersNeeded: "25"
    },
    {
        name: "Animal Shelter",
        description: "The staff at the IFAS are looking into toys and structures to help relieve the stress of their residents! Join them on January of next year to create wooden climbing structures. Perfect for those who like working with their hands and enjoy socializing with feral animals.",
        location: "International Feral Animal Shelter",
        requiredSkills: "Power Tools",
        urgency: "Help Would be Appreciated",
        date: "1/8/25",
        time: "4:30 PM",
        volunteersNeeded: "5"
    },
    {
        name: "Soup Kitchen",
        description: "The Cola-Cola Company is looking to get into the soup industry and also happens to be in a giving mood. Come volunteer for the local Missouri community in being one of the first to serve fresh hot bowls of Coca-Cola soup.",
        location: "Missouri Coca-Cola Factory",
        requiredSkills: "Commmunication, Time Management",
        urgency: "Help Needed",
        date: "2/12/25",
        time: "1:30 PM",
        volunteersNeeded: "4"
    },
    {
        name: "Special Needs School",
        description: "Come join us in the grand opening of Lebron James' special needs school. Volunteers will give tours around the campus and facilitate with delivering the end of day kindergarten curriculum.",
        location: "Lebron James School for Special Needs",
        requiredSkills: "Communication",
        urgency: "Help Necessary",
        date: "10/20/24",
        time: "4:30 PM",
        volunteersNeeded: "15"
    },

];

const getHistory = async (req, res) => {
    res.json(events)
}

// const getHistory = async (req, res) => {
//     const eventName = req.params.eventName;
//     const event = events.find(event => event.name === eventName);

//     if (event) {
//         res.json(event);
//     } else {
//         res.status(404).send('Event not found');
//     }
// }

export { getHistory };