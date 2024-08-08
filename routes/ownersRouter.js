const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let ownerCount = await ownerModel.find();
    if (ownerCount.length > 0) {
      res
        .status(503)
        .send("you dont have the permission to create a new owner");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

router.get("/admin", function (req, res) {
  let success = req.flash("success");
  res.render("createProducts", { success });
});

module.exports = router;
