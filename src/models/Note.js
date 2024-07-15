import mongoose from "mongoose"

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of user ids
  },
  { timestamps: true }
)

noteSchema.index({ title: "text", content: "text" }) // create text index to support text search queries

const Note = mongoose.model("Note", noteSchema)

export default Note
