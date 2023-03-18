const mongoose = require("mongoose");
const request = require("supertest");

const { app } = require("../server");

require("dotenv").config();


mongoose.connect("mongodb://localhost:27017")

describe("POST /api/signUp", () => {
    it("should create a user", async () => {
        let res = await request(app).post("/api/signUp").send({
        name: "John",
        email: "john@mail.com",
        password: "John@123",
        });
        expect(res.status).toBe(201);
    });
});
