const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    avatar: { type: String },
    phone: { type: String },
    role: { type: String },
    email: { type: String },
    address: { type: String },
    historySeen: [{ name: { type: String }, url: { type: String } }],
  },
  {
    collection: "account",
    timestamps: true,
  }
);

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;
