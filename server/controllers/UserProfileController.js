let userData = [
{
    FullName: "Matthew Sean Kalanta",
    DateOfBirth: "2000-10-20",
    Gender: "Male",
    Address1: "5151 Richmond Avenue",
    City: "Houston",
    State: "TX",
    ZipCode: "77056",
    Availability: "2025-10-14, 2025-10-15, 2025-10-16, 2025-10-17, 2025-10-18, 2025-10-20, 2025-10-21, 2025-10-22, 2025-10-23, 2025-10-24",
    Skills: "Teamwork , Communication",
    Preferences: "None",




}];
const getUserInfo = async (req, res) => {
    res.status(200).json(userData)

}
const updateUserInfo = async (req, res) => {
    const patch = req.body;
    if (Object.keys(patch).length === 0) {
        res.status(400).json({ error: "No fields provided for Update" });
        return;
    }


    try {

        for (const key of Object.keys(patch)) {
            userData[key] = patch[key]
        }
        res.status(200).json({ success: "Profile Updated Sucessfully", user: userData })




    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error." })

    }

}
export { getUserInfo, updateUserInfo, userData };