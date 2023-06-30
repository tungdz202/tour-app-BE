const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
  {
    name: { type: String },
    img: { type: String },
    rate: [{ type: String, ref: "rate" }],
    popularAttractions: [{ type: String }],
  },
  {
    collection: "provinces",
    timestamps: true,
  }
);

const ProvinceModel = mongoose.model("provinces", ProvinceSchema);

module.exports = ProvinceModel;
