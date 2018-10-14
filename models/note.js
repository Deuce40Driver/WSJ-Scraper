//Dependencies
var mongoose = require("mongoose");

// Saving a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor to create a NoteSchema object with title and body fields
var NoteSchema = new Schema({
  title: String,
  body: String
});

// Using mongoose model method to create a model from the NoteSchema object
var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;