const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.MongoDB || "mongodb://localhost";

async function connect() {
  try {
    await mongoose.connect(port, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("kết nối thành công!!!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
