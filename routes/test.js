const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  console.log("great success !");
  res.send({ message: "great success indeed" });
});

module.exports = router;
