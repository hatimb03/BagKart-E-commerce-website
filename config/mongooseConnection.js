const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/BagKart`)
  .then(function () {
    dbgr("connected to the db server");
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
