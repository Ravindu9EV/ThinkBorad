import Note from "../models/Note.js";

//get All Note
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //sort in desc order
    res.status(200).json(notes);
    console.log(notes);
  } catch (error) {
    console.error("Error in getAllNotes Controller ", error);

    res.status(500).json({ message: "Internal server error" });
  }
}

//create Note
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//update Note
export async function updateNote(req, res) {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//find Note by ID
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note Not found" });

    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//delete Note
export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote)
      return res.status(404).json({ message: "Note not found!" });

    res
      .status(200)
      .json({ message: `Note ${req.params.id} deleted successfully!` });
  } catch (error) {
    console.error("Error in deleteNote controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
