const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            res.send(err.message);
          } else {
            let user = await userModel.create({
              fullname,
              email,
              password: hash,
            });

            let token = generateToken(user); //generating the jwt token
            res.cookie("token", token);
            res.send("User created successfully");
          }
        });
      });
    } else {
      res.status(401).send("User already exists");
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).send("Email or password is incorrect");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      return res.status(404).send("Email or password is incorrect");
    }
  });
};

module.exports.logout = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
