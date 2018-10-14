//Dependencies
var mongoose = require("mongoose");

// Saving a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor to create a ArticleSchema object with title, link,
// and summary fields and a note object that references the associated notes 
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Using mongoose model method to create a model from the ArticleSchema object
var Article = mongoose.model("Article", ArticleSchema);

//Export the Note model
module.exports = Article;