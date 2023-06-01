const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    role: { type: String },
  },
  {
    collection: "account",
    timestamps: true,
  }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
