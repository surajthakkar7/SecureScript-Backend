const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1 : get all notes using : GET "/api/notes/fetchallnotes" . login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Fetch notes that belong to the authenticated user (req.user.id)
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 : add a new note using : POST "/api/notes/addnote" . login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description must be at least 8 characters").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      //if there are errors ,return bad request and errors
      const { title, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server Error!");
    }
  }
);

// Route 3 : update a note using : PUT "/api/notes/updatenote" . login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a newnote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    //find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error!");
  }
});

// Route 4 : delete a note using : DELETE "/api/notes/deletenote" . login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be delete
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ " Success ": "Note has been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error!");
  }
});
module.exports = router;
