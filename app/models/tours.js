const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema(
  {
    name: { type: String },
    place: { type: String },
    description: { type: String },
    highlightDestinations: { type: String },
    prices: { type: Number },
    url: { type: String },
    img: { type: String },
  },
  {
    collection: "tours",
    timestamps: true,
  }
);

const TourModel = mongoose.model("tour", TourSchema);
module.exports = TourModel;
