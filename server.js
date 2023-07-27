const express = require("express");
var bodyParser = require("body-parser");
const db = require("./configs/db/index");
var accountRouter = require("./routers/account");
const route = require("./routers/index");
var cookieParser = require("cookie-parser");
const { cors } = require("./utils/CORS");
require("dotenv").config();

const port = process.env.PORT || 8888;

var app = express();

db.connect();
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors);
app.use(cookieParser());
app.use(jsonParser);
app.use(urlencodedParser);
route(app);

app.use("/api/account", accountRouter);

app.get("/", (req, res, next) => {
  res.send("home");
});

app.listen(port, () => {
  console.log(`Kết nối thành công cổng: ${port}`);
});
