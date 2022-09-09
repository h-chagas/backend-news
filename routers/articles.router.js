const express = require("express");
const {
    getArticlesById,
    patchArticlesById,
    getArticles,
    getCommentsByArticleId,
 } = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get('/', getArticles);
articlesRouter.get('/:article_id', getArticlesById);
articlesRouter.patch('/:article_id', patchArticlesById);
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)


module.exports = articlesRouter;