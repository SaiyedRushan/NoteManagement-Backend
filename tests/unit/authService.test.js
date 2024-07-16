import { signUp, login } from "../../src/services/authService.js"
import User from "../../src/models/User.js"
import { jest } from "@jest/globals"
import bcrypt from "bcryptjs"

// jest.mock("../../src/models/User.js", () => ({
//   __esModule: true,
//   findOne: jest.fn(),
//   save: jest.fn(),
//   create: jest.fn(),
//   updateOne: jest.fn(),
//   deleteOne: jest.fn(),
//   findById: jest.fn(),
//   findByIdAndDelete: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   find: jest.fn(),
// }))

describe("Auth Service", () => {
  describe("signUp", () => {
    it("should create a new user", async () => {
      const mockUser = { _id: "123", username: "testuser", email: "test@example.com" }
      User.findOne = jest.fn().mockResolvedValue(null)
      User.prototype.save = jest.fn().mockResolvedValue(mockUser)

      const user = await signUp("testuser", "test@example.com", "password123")
      expect(User.findOne).toHaveBeenCalledWith({ $or: [{ username: "testuser" }, { email: "test@example.com" }] })
      expect(User.prototype.save).toHaveBeenCalled()
      expect(user).toHaveProperty("username", "testuser")
      expect(user).toHaveProperty("email", "test@example.com")
    })

    it("should throw an error if user already exists", async () => {
      User.findOne = jest.fn().mockResolvedValue({ username: "existinguser" })
      await expect(signUp("existinguser", "existing@example.com", "password123")).rejects.toThrow("Username or email already exists")
    })
  })

  describe("login", () => {
    it("should return user and token for valid credentials", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        password: "$2a$10$testhashedpassword",
        toObject: jest.fn().mockReturnValue({ _id: "123", username: "testuser" }),
      }
      User.findOne = jest.fn().mockResolvedValue(mockUser)
      bcrypt.compare = jest.fn().mockResolvedValue(true)
      const result = await login("testuser", "password123")
      expect(result).toHaveProperty("user")
      expect(result).toHaveProperty("token")
    })

    it("should throw an error for invalid credentials", async () => {
      User.findOne = jest.fn().mockResolvedValue(null)
      await expect(login("nonexistent", "wrongpassword")).rejects.toThrow("Invalid credentials")
    })
  })
})
