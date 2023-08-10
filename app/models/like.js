const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    id_user: { type: String },
  },
  {
    collection: "like",
    timestamps: true,
  }
);

const LikeModel = mongoose.model("like", LikeSchema);
module.exports = LikeModel;
