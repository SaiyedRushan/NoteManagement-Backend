import jwt from "jsonwebtoken"
import User from "../models/User.js"
import config from "../../config.js"

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await User.findOne({ _id: decoded.userId })

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" })
  }
}
