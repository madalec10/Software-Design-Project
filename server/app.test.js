import request from "supertest";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

describe("POST /sign-up", () => {
    test("should respond with a 200 status code", async () => {
        const response =  await request(app).post("/sign-up").send({
            email: "user@gmail.com",
            password: "password"
        })
        expect(response.statusCode).toBe(200)
    })
    test("should respond with a 400 status code", async () => {
        const response =  await request(app).post("/sign-up").send({
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

