const express = require("express");
const {
    getArticlesById,
    patchArticlesById,
    getArticles,
 } = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get('/', getArticles);
articlesRouter.get('/:article_id', getArticlesById);
articlesRouter.patch('/:article_id', patchArticlesById);


module.exports = articlesRouter;