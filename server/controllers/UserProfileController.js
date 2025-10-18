import e from "express";

let userData = [
    {
        email: "volunteer@gmail.com",
        FullName: "Matthew Sean Kalanta",
        DateOfBirth: "2000-10-20",
        Gender: "Male",
        Address1: "5151 Richmond Avenue",
        City: "Houston",
        State: "TX",
        ZipCode: "77056",
        Availability: [
            "2025-10-14", "2025-10-15", "2025-10-16", "2025-10-17", "2025-10-18", "2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-10-24"
        ], 
        Skills: [
            "Teamwork" , "Communication"
        ],
        Preferences: "None",
    },
];
const createUser = async (e) => {

    const email = e;
    const newUser = {
        email,
        FullName: "",
        DateOfBirth: "",
        Gender: "",
        Address1: "",
        City: "",
        State: "",
        ZipCode: "",
        Availability: ["2025-10-20", "2025-10-22"], // some default upcoming dates
        Skills: ["Teamwork"],       // default skills
        Preferences: ""
    };

    userData.push(newUser);
    newUser.email = e;
    
    userData.push(newUser);


}
const getUserInfo = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const user = userData.find((u) => u.email === userEmail);
        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error." });
    }
};
const updateUserInfo = async (req, res) => {
    const userEmail = req.user.email;
    const { ...patch } = req.body || {};

    if (!userEmail) {
        return res.status(400).json({ error: "Email is required to create/update user" });
    }

    try {
        const idx = userData.findIndex(u => u.email === userEmail);

        if (idx === -1) {
            // Create new user (seed missing fields with empty strings; override with patch)
            const newUser = {
                email: userEmail,
                DateOfBirth: "",
                Gender: "",
                Address1: "",
                City: "",
                State: "",
                ZipCode: "",
                Availability: "",
                Skills: "",
                Preferences: "",
                ...patch,
            };

            userData.push(newUser);
            return res.status(201).json({
                success: true,
                created: true,
                message: "Profile created",
                user: newUser,
            });
        }

        // Update existing user
        userData[idx] = { ...userData[idx], ...patch };
        return res.status(200).json({
            success: true,
            created: false,
            message: "Profile updated",
            user: userData[idx],
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
};



export { getUserInfo, updateUserInfo, userData, createUser };
