const express = require("express");
const { validate, Article } = require("../models/article");
const auth = require("../middleware/auth");
const _ = require("lodash");

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await Article.find().sort("publishedDate");
  res.send(articles);
});

router.get("/:tag", async (req, res) => {
  const articles = await Article.find();
  const response = articles.filter((elt) => elt.tags.include(req.params.id));

  res.send(articles);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    publishedDate: req.body.publishedDate,
    lastEditDate: req.body.lastEditDate,
    tags: req.body.tags,
  });
  await article.save(article);
  res.send(article);
});

module.exports = router;
