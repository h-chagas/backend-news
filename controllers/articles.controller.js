const { showArticlesById, updateArticleVotes } = require("../models/articles.models")

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
           
    showArticlesById(article_id)
    .then( (article) => {
        res.send(article)
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticlesById = (req, res, next) => {
   
    const { article_id } = req.params;
    const updateVotes = req.body;

    updateArticleVotes(article_id, updateVotes).then((articleUpdated) => {
        res.status(200).send(articleUpdated)
    })
    .catch((err) => {
        next(err)
    })
}