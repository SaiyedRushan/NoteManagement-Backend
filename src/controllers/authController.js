import * as authService from "../services/authService.js"

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await authService.signUp(username, email, password)
    res.status(201).json({ message: "User created successfully", userId: user._id })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const { user, token } = await authService.login(username, password)
    res.json({ message: "Login successful", token, userId: user._id })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}
