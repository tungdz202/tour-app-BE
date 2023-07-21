const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    name: { type: String },
    departurePoint: { type: String },
    imgs: [{ type: String }],
    listTour: [
      {
        name: { type: String },
        tourcode: { type: String },
        time: { type: String },
        vehicle: { type: String },
        highlightDestinations: { type: String },
        originalPrice: { type: Number },
        presentPrice: { type: Number },
        schedules: [{ type: String }],
        url: { type: String },
        imgs: [{ type: String }],
        origin: { type: String },
      },
    ],
  },
  {
    collection: "collection",
    timestamps: true,
  }
);

const CollectionModel = mongoose.model("collection", CollectionSchema);
module.exports = CollectionModel;
