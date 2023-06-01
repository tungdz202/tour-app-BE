const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    url: { type: String },
    img: { type: String },
    comments: [{ type: String, ref: "comments" }],
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;
