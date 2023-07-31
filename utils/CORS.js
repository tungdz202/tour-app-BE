require("dotenv").config();
const ACCESSURL = process.env.ACCESSURL || "http://localhost:3000";

module.exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ACCESSURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
};
