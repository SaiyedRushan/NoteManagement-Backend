import request from "supertest"
import app from "../../app.js"
import User from "../../src/models/User.js"

describe("Auth API", () => {
  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      })

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty("message", "User created successfully")
      expect(res.body).toHaveProperty("userId")
    })

    it("should return 400 if user already exists", async () => {
      await User.create({ username: "existinguser", email: "existing@example.com", password: "password123" })

      const res = await request(app).post("/api/auth/signup").send({
        username: "existinguser",
        email: "existing@example.com",
        password: "password123",
      })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "Username or email already exists")
    })
  })

  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "password123",
      })

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty("message", "Login successful")
      expect(res.body).toHaveProperty("token")
      expect(res.body).toHaveProperty("userId")
    })

    it("should return 401 with incorrect credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "wrongpassword",
      })

      expect(res.statusCode).toBe(401)
      expect(res.body).toHaveProperty("message", "Invalid credentials")
    })
  })
})
