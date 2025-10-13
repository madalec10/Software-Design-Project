import request from "supertest";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

describe("POST /sign-up", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/sign-up").send({
            email: "user@gmail.com",
            password: "password"
        })
        expect(response.statusCode).toBe(200)
    })
    test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/sign-up").send({
            email: "admin@gmail.com",
            password: "passwordpassword"
        })
        expect(response.statusCode).toBe(400)
    })
})

describe("POST /log-in", () => {
    test("should respond with a 401 status code", async () => {
        const response = await request(app).post("/log-in").send({
            email: "admin@gmail.com",
            password: "wrongPassword"
        })
        expect(response.statusCode).toBe(401)
    })
    test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/log-in").send({
            email: "wrong@email.com",
            password: "wrongPassword"
        })
        expect(response.statusCode).toBe(400)
    })
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/log-in").send({
            email: "admin@gmail.com",
            password: "password1234"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe("GET /all-users", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/all-users")
        expect(response.statusCode).toBe(200)
    })
})

describe("GET /events", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/events")
        expect(response.statusCode).toBe(200)
    })
})

describe("POST /create-event", () => {
    test("should respond with a 200 status code for successful creation", async () => {
        const response = await request(app).post("/create-event").send({
            name: "Community Garden Build Day",
            requiredSkills: "Teamwork, Gardening",
            urgency: "Help Wanted",
            date: "2025-11-15",
            time: "10:30",
            location: "Greenfield Community Center",
            volunteersNeeded: 20,
            description: "Help build raised garden beds and plant vegetables for the neighborhood garden initiative."
        });

        expect(response.statusCode).toBe(200);
    });

    test("should respond with a 400 status code for duplicate event", async () => {
        const response = await request(app).post("/create-event").send({
            name: "Neighborhood Clean-Up Drive",
            requiredSkills: "None (just enthusiasm!)",
            urgency: "Help Needed",
            date: "2025-10-07",
            time: "12:45",
            location: "Riverside Park, Main Entrance",
            volunteersNeeded: 15,
            description: "Join us in making our local park a cleaner, safer space. Volunteers will help with trash collection, recycling, and light landscaping."
        });

        expect(response.statusCode).toBe(400);
    });
});

describe("DELETE /delete-event", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).delete("/delete-event").send({
            name: "Neighborhood Clean-Up Drive",
        })

        expect(response.statusCode).toBe(200)
    })
})

describe("GET /get-event", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/get-event").send({
            name: "Neighborhood Clean-Up Drive",
        })

        expect(response.statusCode).toBe(200)
    })
})

describe("user profile management", () => {
    test("GET /user-info should respond with 200 and user data", async () => {
        const response = await request(app).get("/user-info").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("FullName");
        expect(response.body).toHaveProperty("DateOfBirth");
    });

    test("PATCH /update-user-profile should update user data", async () => {
        const updateData = {
            FullName: "Test User",
            Gender: "Other",
            Skills: ["Organizing", "Time Management"]
        };
        const response = await request(app).patch("/update-user-profile").send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
    });
});

describe("volunteer history", () => {
    test("GET /volunteer-history should respond with 200 and an array", async () => {
        const response = await request(app).get("/volunteer-history").send();
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
