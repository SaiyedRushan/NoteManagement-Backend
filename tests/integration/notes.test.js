import request from "supertest"
import app from "../../app.js"
import User from "../../src/models/User.js"
import Note from "../../src/models/Note.js"
import jwt from "jsonwebtoken"
import config from "../../config.js"

describe("Notes API", () => {
  let token
  let userId

  beforeEach(async () => {
    await User.deleteMany({})
    await Note.deleteMany({})

    const user = await User.create({ username: "testuser", email: "test@example.com", password: "password123" })
    userId = user._id
    token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: "1h" })
  })

  describe("POST /api/notes", () => {
    it("should create a new note", async () => {
      const res = await request(app).post("/api/notes").set("Authorization", `Bearer ${token}`).send({
        title: "Test Note",
        content: "This is a test note",
      })

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty("title", "Test Note")
      expect(res.body).toHaveProperty("content", "This is a test note")
      expect(res.body).toHaveProperty("userId", userId.toString())
    })

    it("should return 401 if not authenticated", async () => {
      const res = await request(app).post("/api/notes").send({
        title: "Test Note",
        content: "This is a test note",
      })

      expect(res.statusCode).toBe(401)
    })
  })

  describe("GET /api/notes", () => {
    it("should return all notes for the authenticated user", async () => {
      const result = await Note.create([
        { title: "Note 1", content: "Content 1", userId },
        { title: "Note 2", content: "Content 2", userId },
      ])

      const res = await request(app).get("/api/notes").set("Authorization", `Bearer ${token}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(res.body[0]).toHaveProperty("title", "Note 1")
      expect(res.body[1]).toHaveProperty("title", "Note 2")
    })
  })
})
