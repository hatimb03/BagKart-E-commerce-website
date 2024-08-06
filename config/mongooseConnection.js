const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/BagKart")
  .then(function () {
    console.log("connected to the db server");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
