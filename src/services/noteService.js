import Note from "../models/Note.js"

export const getAllNotes = async (userId) => {
  return await Note.find({ userId })
}

export const getNoteById = async (id, userId) => {
  const note = await Note.findOne({ _id: id, userId })
  if (!note) {
    throw new Error("Note not found")
  }
  return note
}

export const createNote = async (noteData, userId) => {
  const note = new Note({
    ...noteData,
    userId,
  })
  await note.save()
  return note
}

export const updateNote = async (id, noteData, userId) => {
  const note = await Note.findOneAndUpdate({ _id: id, userId }, { $set: noteData }, { new: true, runValidators: true })
  if (!note) {
    throw new Error("Note not found")
  }
  return note
}

export const deleteNote = async (id, userId) => {
  const note = await Note.findOneAndDelete({ _id: id, userId })
  if (!note) {
    throw new Error("Note not found")
  }
  return note
}

export const shareNote = async (id, userId, sharedWithUserId) => {
  const note = await Note.findOne({ _id: id, userId })
  if (!note) {
    throw new Error("Note not found")
  }
  if (!note.sharedWith.includes(sharedWithUserId)) {
    note.sharedWith.push(sharedWithUserId)
    await note.save()
  }
  return note
}

export const searchNotes = async (query, userId) => {
  return await Note.find(
    {
      userId,
      $text: { $search: query },
    },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } })
}
