import * as noteService from "../services/noteService.js"

export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes(req.user._id)
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getNoteById = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id, req.user._id)
    res.json(note)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.body, req.user._id)
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body, req.user._id)
    res.json(note)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteNote = async (req, res) => {
  try {
    await noteService.deleteNote(req.params.id, req.user._id)
    res.json({ message: "Note deleted successfully" })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const shareNote = async (req, res) => {
  try {
    const note = await noteService.shareNote(req.params.id, req.user._id, req.body.sharedWithUserId)
    res.json(note)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const searchNotes = async (req, res) => {
  try {
    const notes = await noteService.searchNotes(req.query.q, req.user._id)
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
