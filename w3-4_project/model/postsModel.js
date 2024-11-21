const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  author: String,
  date: String,
  attachments: [String],
  lastUpdated: String,
});

const PostsModel = mongoose.model("posts", PostsSchema);

module.exports = {
  PostsModel,
  PostsSchema,
};
