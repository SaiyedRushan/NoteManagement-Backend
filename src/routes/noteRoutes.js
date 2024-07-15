import express from "express"
import * as noteController from "../controllers/noteController.js"
import { authenticate } from "../middleware/authMiddleware.js"

const router = express.Router()

// Apply authentication middleware to all note routes
router.use(authenticate)

router.get("/", noteController.getAllNotes)
router.get("/search", noteController.searchNotes)
router.get("/:id", noteController.getNoteById)
router.post("/", noteController.createNote)
router.put("/:id", noteController.updateNote)
router.delete("/:id", noteController.deleteNote)
router.post("/:id/share", noteController.shareNote)

export default router
