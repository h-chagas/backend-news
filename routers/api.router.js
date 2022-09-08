const express = require("express");
const articlesRouter = require('./articles.router')

const { getTopics } = require("../controllers/topics.controllers");
const { getUsers } = require("../controllers/users.controller");

const apiRouter = express.Router();

apiRouter.use('/articles', articlesRouter);
apiRouter.get('/topics', getTopics);
apiRouter.get('/users', getUsers);

module.exports = apiRouter;
