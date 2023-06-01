const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
  {
    name: { type: String },
    rate: [{ type: String, ref: "rate" }],
  },
  {
    collection: "provinces",
    timestamps: true,
  }
);

const ProvinceModel = mongoose.model("provinces", ProvinceSchema);

module.exports = ProvinceModel;
