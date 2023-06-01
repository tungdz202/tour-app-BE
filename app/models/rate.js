const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    star: { type: Number },
    id_user: { type: String },
    id_province: { type: String },
  },
  {
    collection: "rates",
    timestamps: true,
  }
);

const RateModel = mongoose.model("rate", RateSchema);

module.exports = RateModel;
