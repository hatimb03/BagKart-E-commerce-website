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
  let user = await userModel.findOne({ email: req.user.email });
  let success = req.flash("success");
  res.render("shop", { allProducts, user, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  let sum = 0;
  let discount = 0;
  let mrp = 0;
  user.cart.forEach((val) => {
    sum = sum + (val.price - val.discount);
    discount = discount + val.discount;
    mrp = mrp + val.price;
  });
  const breakdown = { sum, discount, mrp };

  res.render("cart", { user, breakdown });
});

router.get("/addtocart/:productId", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productId);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
