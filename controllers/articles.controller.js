const { showArticlesById } = require("../models/articles.models")

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