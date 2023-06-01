const express = require("express");
var bodyParser = require("body-parser");
const AccountModel = require("./app/models/account");
const db = require("./configs/db/index");
var accountRouter = require("./routers/account");
const route = require("./routers/index");
var cookieParser = require("cookie-parser");

var app = express();

db.connect();
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(jsonParser);
app.use(urlencodedParser);
route(app);

app.use("/api/account", accountRouter);

app.get("/", (req, res, next) => {
  res.send("home");
});

app.listen(8888, () => {
  console.log(`Example app listening on port`);
});
