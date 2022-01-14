const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = user.generateToken();
  const response = _.pick(user, ["_id", "username", "email"]);
  response.token = token;
  res.send(response);
});

const validate = (req) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(4).max(255),
  });
  return schema.validate(req);
};

module.exports = router;
