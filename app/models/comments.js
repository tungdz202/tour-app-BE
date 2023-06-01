const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    description: { type: String },
    id_user: { type: String },
    id_blog: { type: String },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;
