const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
  {
    name: { type: String },
    img: { type: String },
    like: [{ type: String, ref: "like" }],
    popularAttractions: [{ type: String }],
    sumTour: { type: Number },
  },
  {
    collection: "provinces",
    timestamps: true,
  }
);

const ProvinceModel = mongoose.model("provinces", ProvinceSchema);

module.exports = ProvinceModel;
