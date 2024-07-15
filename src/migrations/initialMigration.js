import mongoose from "mongoose"
import User from "../models/User.js"
import Note from "../models/Note.js"

const runMigration = async () => {
  try {
    // Create collections
    await User.createCollection()
    await Note.createCollection()

    // Create indexes
    await User.collection.createIndex({ username: 1 }, { unique: true })
    await User.collection.createIndex({ email: 1 }, { unique: true })
    await Note.collection.createIndex({ userId: 1 })
    await Note.collection.createIndex({ title: "text", content: "text" })

    console.log("Initial migration completed successfully")
  } catch (error) {
    console.error("Migration error:", error)
  } finally {
    await mongoose.connection.close()
  }
}

export default runMigration
