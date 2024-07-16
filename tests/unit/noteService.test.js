import * as noteService from "../../src/services/noteService.js"
import Note from "../../src/models/Note.js"
import { jest } from "@jest/globals"

// jest.mock("../../src/models/Note.js", () => {
//   __esModule: true // this property makes it work
// })

describe("Note Service", () => {
  const mockUserId = "123"
  const mockNoteId = "456"

  describe("getAllNotes", () => {
    it("should return all notes for a user", async () => {
      const mockNotes = [{ _id: mockNoteId, title: "Test Note", content: "Test Content" }]

      Note.find = jest.fn().mockResolvedValue(mockNotes)

      const result = await noteService.getAllNotes(mockUserId)
      expect(result).toEqual(mockNotes)
      expect(Note.find).toHaveBeenCalledWith({ userId: mockUserId })
    })
  })

  describe("createNote", () => {
    it("should create a new note", async () => {
      const mockNote = { _id: mockNoteId, title: "New Note", content: "New Content", userId: mockUserId }
      Note.prototype.save = jest.fn().mockResolvedValue(mockNote)

      const result = await noteService.createNote({ title: "New Note", content: "New Content" }, mockUserId)
      expect(Note.prototype.save).toHaveBeenCalled()
      expect(result).toHaveProperty("title", "New Note")
      expect(result).toHaveProperty("content", "New Content")
    })
  })
})
