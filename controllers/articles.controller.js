const {
   showArticlesById,
   updateArticleVotes,
   showArticles,
   showCommentsByArticleId,
} = require("../models/articles.models");

exports.getArticlesById = (req, res, next) => {
   const { article_id } = req.params;

   showArticlesById(article_id)
      .then((article) => {
         res.status(200).send(article);
      })
      .catch((err) => {
         next(err);
      });
};

exports.patchArticlesById = (req, res, next) => {
   const { article_id } = req.params;
   const updateVotes = req.body;

   updateArticleVotes(article_id, updateVotes)
      .then((articleUpdated) => {
         res.status(200).send(articleUpdated);
      })
      .catch((err) => {
         next(err);
      });
};

exports.getArticles = (req, res, next) => {

    const { topic } = req.query

   showArticles(topic)
      .then((articles) => {
         res.status(200).send(articles);
      })
      .catch((err) => {
         next(err);
      });
};

exports.getCommentsByArticleId = (req, res, next) => {

   const { article_id } = req.params;

   showCommentsByArticleId(article_id)
   .then((comments) => {
      res.status(200).send(comments)
   })
   .catch((err) => {
      next(err)
   })
}
