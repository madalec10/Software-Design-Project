import e from "express";
import db from "../db.js";


// let userData = [
//     {
//         email: "Henry@gmail.com",
//         FullName: "Matthew Sean Kalanta",
//         DateOfBirth: "2000-10-20",
//         Gender: "Male",
//         Address1: "5151 Richmond Avenue",
//         City: "Houston",
//         State: "TX",
//         ZipCode: "77056",
//         Availability: [
//             "2025-10-14", "2025-10-15", "2025-10-16", "2025-10-17", "2025-10-18", "2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-10-24"
//         ], 
//         Skills: [
//             "Teamwork" , "Communication"
//         ],
//         Preferences: "None",
//     },
// ];

const createUser = async (e) => {


    const email = e;
    try{
        await db.query(
            `INSERT INTO userProfile (email, fullName, dateOfBirth, gender, address1, city1, state1, zip1, address2, city2, state2, zip2, preferences)
            VALUES (?, '', NULL, NULL, '', '', '', '', '', '', '', '', '')`,
            [email]
        );
        await db.query(`INSERT INTO skills (email, skill) VALUES (?, 'Teamwork')`, [email]);
        await db.query(`INSERT INTO availability (email, date) VALUES (?, '2025-10-20'), (?, '2025-10-22')`, [email, email]);

    }
    catch(err){
        console.log(err)
    }


}
const getUserInfo = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const [profileRows] = await db.query("SELECT * FROM userProfile WHERE email = ?", [userEmail]);

        if (profileRows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const profile = profileRows[0];

        const [skillsRows] = await db.query("SELECT skill FROM skills WHERE email = ?", [userEmail]);

        const [availabilityRows] = await db.query("SELECT date FROM availability WHERE email = ?", [userEmail]);

        profile.skills = skillsRows.map((s) => s.skill);
        profile.availability = availabilityRows.map((a) => a.date);

        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error." });
    }
};

const cleanDate = (d) => {
    if (!d) return null;
    if (typeof d === "string") return d.split("T")[0]; // remove time
    if (d.format) return d.format("YYYY-MM-DD"); // if from DatePicker
    return null;
};

const updateUserInfo = async (req, res) => {
    const userEmail = req.user.email;
    let { fullName, dateOfBirth, gender, address1, city1, state1, zip1, address2, city2, state2, zip2, preferences, skills, availability } = req.body;
    
    
    dateOfBirth = cleanDate(dateOfBirth);
    try {
        const [existing] = await db.query("SELECT * FROM userProfile WHERE email = ?", [userEmail]);

        if (existing.length === 0) {
            // Create new profile if not found
            await db.query(
            `INSERT INTO userProfile (email, fullName, dateOfBirth, gender, address1, city1, state1, zip1, preferences)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userEmail, fullName || "", dateOfBirth || null, gender || null, address1 || "", city1 || "", state1 || "", zip1 || "", preferences || ""]
            );
        }
        else{
            await db.query(
                `UPDATE userProfile 
                SET fullName = ?, dateOfBirth = ?, gender = ?, address1 = ?, city1 = ?, state1 = ?, zip1 = ?, preferences = ?, address2 = ?, city2 = ?, state2 = ?, zip2 = ?
                WHERE email = ?`,
                [fullName || "", dateOfBirth || null, gender || null, address1 || "", city1 || "", state1 || "", zip1 || "", preferences || "", address2 || "", city2 || "", state2 || "", zip2 || "", userEmail]
            );
        }
        
        if (Array.isArray(skills)) {
            await db.query("DELETE FROM skills WHERE email = ?", [userEmail]);
            for (const skill of skills) {
                await db.query("INSERT INTO skills (email, skill) VALUES (?, ?)", [userEmail, skill]);
            }
        }
        if (Array.isArray(availability)) {
            await db.query("DELETE FROM availability WHERE email = ?", [userEmail]);

            // clean all dates
            const cleanedAvailability = availability.map(cleanDate).filter(Boolean);

            for (const date of cleanedAvailability) {
                await db.query("INSERT INTO availability (email, date) VALUES (?, ?)", [userEmail, date]);
            }
        }

        
        return res.status(201).json({
            success: true,
            created: true,
            message: "Profile created"
        });
        
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
};



export { getUserInfo, updateUserInfo, createUser };
