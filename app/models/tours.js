const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema(
  {
    name: { type: String },
    tourcode: { type: String },
    time: { type: String },
    vehicle: { type: String },
    departurePoint: { type: String },
    highlightDestinations: { type: String },
    originalPrice: { type: Number },
    presentPrice: { type: Number },
    url: { type: String },
    imgs: [{ type: String }],
    schedules: [{ type: String }],
    origin: { type: String },
    touristAttraction: [{ type: String }],
  },
  {
    collection: "tours",
    timestamps: true,
  }
);

const TourModel = mongoose.model("tour", TourSchema);
module.exports = TourModel;
