const express = require("express");
const app = express();
const db = require("./config/mongooseConnection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

app.set("view engines", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
