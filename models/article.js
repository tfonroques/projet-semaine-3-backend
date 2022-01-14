const mongoose = require("mongoose");
const Joi = require("joi");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  lastEditDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  tags: {
    type: Array,
    default: [],
  },
});

const Article = mongoose.model("Article", articleSchema);

const validateArticle = (article) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(255),
    content: Joi.string().required().min(4),
    publishedDate: Joi.date(),
    lastEditDate: Joi.date(),
    tags: Joi.array(),
  });
  return schema.validate(article);
};

exports.Article = Article;
exports.validate = validateArticle;
