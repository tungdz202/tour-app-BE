const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://anhbt202:tunganhdaica2002@tour-database.dgh61um.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("kết nối thành công!!!");
  } catch (error) {
    console.log("kết nối thất bại!!!");
  }
}

module.exports = { connect };
