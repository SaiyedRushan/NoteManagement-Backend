import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const signUp = async (username, email, password) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] })
  if (existingUser) {
    throw new Error("Username or email already exists")
  }

  const user = new User({ username, email, password })
  await user.save()

  return user
}

export const login = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

  return { user, token }
}
