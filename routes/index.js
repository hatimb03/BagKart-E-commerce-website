const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let allProducts = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { allProducts, success });
});

router.get("/cart", isLoggedIn, function (req, res) {
  res.render("cart");
});

router.get("/addtocart/:productId", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productId);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
